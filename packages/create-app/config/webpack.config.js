const { PATH } = require('../utils');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { isEnvDevelopment, isProduction } = require('../utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function getCss(options = { modules: false }) {
  return [
    !isEnvDevelopment && MiniCssExtractPlugin.loader,
    isEnvDevelopment && require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: options.modules,
      },
    },
    // {
    //   loader: require.resolve('postcss-loader'),
    //   options: {
    //     postcssOptions: {
    //       ident: 'postcss',
    //       plugins: [
    //         require('tailwindcss'),
    //         require('postcss-preset-env')({
    //           stage: 3,
    //         }),
    //       ],
    //     },
    //   },
    // },
  ];
}

const config = {
  mode: isEnvDevelopment ? 'development' : 'production',
  entry: PATH.srcIndexPath,
  devtool: isEnvDevelopment ? 'cheap-module-source-map' : false,
  output: {
    path: PATH.buildPath,
    publicPath: '/',
    filename: isEnvDevelopment ? `js/[name].js` : `js/[name].[contenthash:8].js`,
    chunkFilename: isEnvDevelopment ? 'js/[name].chunk.js' : 'js/[name].[contenthash:8].chunk.js',
    clean: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 作为基础包
        lib: {
          test: /\/node_modules\/(react|react-dom|lodash|lodash-es)\//,
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    // plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@': PATH.srcPath,
    },
  },
  devServer: {
    compress: true,
    static: {
      directory: PATH.publicPath,
      publicPath: '/',
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          // 提高性能，只处理 /src，要处理 node_modules 自行添加
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            use: [
              { loader: require.resolve('thread-loader') },
              {
                loader: require.resolve('babel-loader'),
                options: {
                  cacheDirectory: true,
                  cacheCompression: false,
                  compact: !isEnvDevelopment,
                },
              },
            ],
            include: [PATH.srcPath],
          },
          {
            test: /\.module\.css$/,
            use: [...getCss({ modules: true })].filter(Boolean),
          },
          {
            test: /\.css$/,
            use: [...getCss()].filter(Boolean),
          },
          // {
          //   test: /\.module\.less$/,
          //   use: [...getCss({ modules: true }), require.resolve('less-loader')].filter(Boolean),
          // },
          // {
          //   test: /\.less$/,
          //   use: [...getCss(), require.resolve('less-loader')].filter(Boolean),
          // },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'media/image/[name].[hash:8].[ext]',
            },
          },
          // {
          //   test: /\/svg\/(\w|\W)+\.svg$/,
          //   use: [
          //     {
          //       loader: '@svgr/webpack',
          //       options: {
          //         icon: true,
          //         expandProps: 'start',
          //         svgProps: {
          //           fill: 'currentColor',
          //           // className 冗余
          //           className: "{'gm-svg-icon t-svg-icon m-svg-icon ' + (props.className || '')}",
          //         },
          //       },
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
  plugins: [
    isEnvDevelopment && new WebpackBar(),
    isEnvDevelopment && new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: PATH.indexTemplatePath,
    }),
    // new ForkTsCheckerWebpackPlugin(),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: 'css/[name]/[contenthash:8].css',
        chunkFilename: 'css/[name]/[contenthash:8].chunk.css',
      }),
    // scope hosting
    !isEnvDevelopment && new webpack.optimize.ModuleConcatenationPlugin(),
  ].filter(Boolean),
};

module.exports = config;
