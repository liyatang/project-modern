const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const WebpackBar = require("webpackbar");

const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");
const {
  isEnvDevelopment,
  isEnvTest,
  isEnvProduction,
  packageJson,
  commonInclude,
  PATH,
  getConfig,
} = require("../util");
const CheckPlugin = require("./check_plugin");

// 做个检测，需要提供 aliasName clientName
if (!packageJson.aliasName || !packageJson.clientName) {
  throw new Error("请提供 aliasName clientName");
}
const appConfig = getConfig();
function getCss(options = { modules: false }) {
  return [
    !isEnvDevelopment && MiniCssExtractPlugin.loader,
    isEnvDevelopment && require.resolve("style-loader"),
    {
      loader: require.resolve("css-loader"),
      options: {
        modules: options.modules,
      },
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        postcssOptions: {
          ident: "postcss",
          plugins: [
            require("tailwindcss"),
            require("postcss-preset-env")({
              stage: 3,
            }),
          ],
        },
      },
    },
  ];
}

// 以下配置综合参考 CRA 和 相关文章
let config = {
  mode: isEnvDevelopment ? "development" : "production",
  entry: [isEnvDevelopment && "react-hot-loader/patch", PATH.appIndexJs].filter(
    Boolean
  ),
  // 暂时不启动 source-map
  devtool: isEnvDevelopment ? "cheap-module-eval-source-map" : false,
  output: {
    path: PATH.appBuild,
    filename: isEnvDevelopment
      ? `js/bundle.js`
      : `js/[name]/[contenthash:8].js`,
    chunkFilename: isEnvDevelopment
      ? "js/[name].chunk.js"
      : "js/[name]/[contenthash:8].chunk.js",
    publicPath: appConfig.publicPath,
  },
  optimization: {
    minimize: !isEnvDevelopment,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          mangle: false, // Note `mangle.properties` is `false` by default.
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: ".",
      minSize: 50000,
      maxAsyncRequests: 4,
      maxInitialRequests: 3,
      // 暂时先这样，后面逐步完善
      cacheGroups: {
        // 作为基础包
        common_base: {
          test: /\/node_modules\/(react|react-dom|prop-types|lodash|moment|mobx|mobx-react|mobx-react-lite)\//,
          chunks: "all",
          priority: 10,
        },
        // 减少冗余
        common_chunk: {
          test: path.resolve(PATH.appDirectory + "/src"),
          minChunks: 3,
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        oneOf: [
          // 提高性能，只处理 /src，要处理 node_modules 自行添加
          {
            test: /\.(js|tsx?)$/,
            use: [
              { loader: require.resolve("thread-loader") },
              {
                loader: require.resolve("babel-loader"),
                options: {
                  cacheDirectory: true,
                  cacheCompression: false,
                  compact: !isEnvDevelopment,
                },
              },
            ],
            include: commonInclude,
            exclude: /@babel\/runtime/,
          },
          {
            test: /\.module\.css$/,
            use: [...getCss({ modules: true })].filter(Boolean),
          },
          {
            test: /\.css$/,
            use: [...getCss()].filter(Boolean),
          },
          {
            test: /\.module\.less$/,
            use: [
              ...getCss({ modules: true }),
              require.resolve("less-loader"),
            ].filter(Boolean),
          },
          {
            test: /\.less$/,
            use: [...getCss(), require.resolve("less-loader")].filter(Boolean),
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "media/image/[name].[hash:8].[ext]",
            },
          },
          {
            test: /\/svg\/(\w|\W)+\.svg$/,
            use: [
              {
                loader: "@svgr/webpack",
                options: {
                  icon: true,
                  expandProps: "start",
                  svgProps: {
                    fill: "currentColor",
                    // className 冗余
                    className:
                      "{'gm-svg-icon t-svg-icon m-svg-icon ' + (props.className || '')}",
                  },
                },
              },
            ],
          },
          // iconfont 应该要废弃掉
          {
            test: /(fontawesome-webfont|glyphicons-halflings-regular|iconfont|gm-mobile-icons)\.(woff|woff2|ttf|eot|svg)($|\?)/,
            use: [
              {
                loader: require.resolve("url-loader"),
                options: {
                  limit: 10000,
                  name: "media/font/[name].[hash:8].[ext]",
                },
              },
            ],
          },
          // new loader ? add here before file-loader

          // other assets
          // {
          //   loader: require.resolve('file-loader'),
          //   exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          //   options: {
          //     name: 'media/file/[name].[hash:8].[ext]'
          //   }
          // }
        ],
      },
    ],
  },
  plugins: [
    isEnvDevelopment && new WebpackBar(),
    isEnvDevelopment && new CaseSensitivePathsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      memoryLimit: 4096,
      tsconfig: PATH.appDirectory + "/tsconfig.json",
      checkSyntacticErrors: true,
      reportFiles: [`${PATH.appSrc}/**/*.{ts,tsx}`],
    }),
    new webpack.DefinePlugin({
      __DEBUG__: isEnvDevelopment,
      __DEVELOPMENT__: isEnvDevelopment,
      __TEST__: isEnvTest,
      __PRODUCTION__: isEnvProduction,
      __VERSION__: JSON.stringify(packageJson.version),
      __NAME__: JSON.stringify(packageJson.aliasName || "none"),
      __CLIENT_NAME__: JSON.stringify(packageJson.clientName || "none"),
      __BRANCH__: JSON.stringify(process.env.GIT_BRANCH || "none"),
      __COMMIT__: JSON.stringify(process.env.GIT_COMMIT || "none"),
      __AUTO_ROUTER_REG__: appConfig.autoRouterReg || "/index\\.page\\./",
    }),
    new HtmlWebpackPlugin({
      template: PATH.appIndexTemplate,
      branch: process.env.GIT_BRANCH || "none",
      commit: process.env.GIT_COMMIT || "none",
      env: process.env.NODE_ENV || "none",
    }),
    isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
    !isEnvDevelopment &&
      new MiniCssExtractPlugin({
        filename: "css/[name]/[contenthash:8].css",
        chunkFilename: "css/[name]/[contenthash:8].chunk.css",
      }),
    // scope hosting
    !isEnvDevelopment && new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    !isEnvDevelopment && new CheckPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: _.pickBy(
      {
        // yarn link 后保持 react/core-js/core-js-pure 一致
        react:
          isEnvDevelopment &&
          path.resolve(PATH.appDirectory + "/node_modules/react"),
        "react-router":
          isEnvDevelopment &&
          path.resolve(PATH.appDirectory + "/node_modules/react-router"),
        "react-router-dom":
          isEnvDevelopment &&
          path.resolve(PATH.appDirectory + "/node_modules/react-router-dom"),
        "core-js":
          isEnvDevelopment &&
          path.resolve(PATH.appDirectory + "/node_modules/core-js"),
        "core-js-pure":
          isEnvDevelopment &&
          path.resolve(PATH.appDirectory + "/node_modules/core-js-pure"),
        "bn.js":
          isEnvDevelopment &&
          path.resolve(PATH.appDirectory + "/node_modules/bn.js"),
        "@gm-common":
          isEnvDevelopment &&
          path.resolve(PATH.appDirectory + "/node_modules/@gm-common"),
        "@gm-pc":
          isEnvDevelopment &&
          path.resolve(PATH.appDirectory + "/node_modules/@gm-pc"),
        // 'react-dom/server':
        //   isEnvDevelopment && require.resolve('@hot-loader/react-dom/server'),
        // 'react-dom':
        //   isEnvDevelopment && require.resolve('@hot-loader/react-dom'),
        common: PATH.appDirectory + "/src/js/common/",
        stores: PATH.appDirectory + "/src/js/stores/",
        svg: PATH.appDirectory + "/src/svg/",
        img: PATH.appDirectory + "/src/img/",
        "@": PATH.appDirectory + "/src/",
      },
      Boolean
    ),
    extensions: [".js", ".tsx", ".ts"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: PATH.appDirectory + "/tsconfig.json",
      }),
    ],
  },
  devServer: {
    disableHostCheck: true,
    compress: true,
    contentBase: PATH.appDirectory,
    hot: true,
    publicPath: appConfig.publicPath,
    historyApiFallback: {
      index: appConfig.publicPath + "index.html",
    },
    host: "0.0.0.0",
    port: appConfig.port || 8080,
    proxy: appConfig.proxy || {},
    https: appConfig.https || false,
    open: true,
  },
};

if (fs.existsSync(PATH.appConfig + "/webpack.config.js")) {
  config = require(PATH.appConfig + "/webpack.config.js")(config);
}

module.exports = config;
