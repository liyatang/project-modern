import { Graph } from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { Selection } from '@antv/x6-plugin-selection';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { KeyCommand } from './key_command';
import './node';
import './edge';

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

    this.pCommonUse();
    this.pCommonEvent();

    // 画布容纳所有元素
    this.zoomToFit({ maxScale: 1 });
    // 居中
    this.centerContent();
  }

  private pCommonUse() {
    // 对齐线
    this.use(
      new Snapline({
        enabled: true,
      }),
    );

    // 选中
    this.use(
      new Selection({
        enabled: true,
        showNodeSelectionBox: true,
      }),
    );

    // 复制
    this.use(
      new Clipboard({
        enabled: true,
      }),
    );

    // 快捷键
    this.use(
      new Keyboard({
        enabled: true,
      }),
    );
  }

  private pCommonEvent() {
    this.bindKey(KeyCommand.COPY, () => {
      const cells = this.getSelectedCells();
      if (cells.length) {
        this.copy(cells);
      }
      return false;
    });

    this.bindKey(KeyCommand.PASTER, () => {
      if (!this.isClipboardEmpty()) {
        const cells = this.paste({ offset: 32 });
        this.cleanSelection();
        this.select(cells);
      }
      return false;
    });
  }
}

export { FlowGraph };
