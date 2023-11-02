import { Graph } from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';
import './node';
import './edge';

function commonUse(graph) {
  graph.use(
    new Snapline({
      enabled: true,
    }),
  );
}

function commonOption(): Graph.Options {
  return {
    // 自适应
    autoResize: true,
    // 移动
    panning: true,
    // 缩放
    mousewheel: true,
    // 背景
    background: {
      color: '#F2F7FA',
    },
    // 网格
    grid: {
      visible: true,
      type: 'doubleMesh',
      args: [
        {
          color: '#eee', // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: '#ddd', // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
  };
}

class FlowGraph extends Graph {
  constructor(options: Graph.Options) {
    super({
      ...commonOption(),
      ...options,
    });

    commonUse(this);

    // 画布容纳所有元素
    this.zoomToFit({ maxScale: 1 });
    // 居中
    this.centerContent();
  }
}

export { FlowGraph };
