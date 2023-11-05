import { Graph } from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { Selection } from '@antv/x6-plugin-selection';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { History } from '@antv/x6-plugin-history';
import { Stencil } from '@antv/x6-plugin-stencil';

import { KeyCommand } from './helper';
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

const commonAttrs = {
  body: {
    fill: '#fff',
    stroke: '#8f8f8f',
    strokeWidth: 1,
  },
};

function stencilLoad({ graph, stencil }) {
  const n1 = graph.createNode({
    shape: 'rect',
    x: 40,
    y: 40,
    width: 80,
    height: 40,
    label: 'rect',
    attrs: commonAttrs,
  });

  const n2 = graph.createNode({
    shape: 'circle',
    x: 180,
    y: 40,
    width: 40,
    height: 40,
    label: 'circle',
    attrs: commonAttrs,
  });

  const n3 = graph.createNode({
    shape: 'ellipse',
    x: 280,
    y: 40,
    width: 80,
    height: 40,
    label: 'ellipse',
    attrs: commonAttrs,
  });

  stencil.load([n1, n2], 'group1');
  stencil.load([n3], 'group2');
}

interface FlowGraphOptions {
  stencilContainer: HTMLElement;
}

class FlowGraph extends Graph {
  stencilContainer: HTMLElement;
  stencil: Stencil | null = null;

  constructor(options: Graph.Options, otherOptions: FlowGraphOptions) {
    super({
      ...commonOption(),
      ...options,
    });

    this.stencilContainer = otherOptions.stencilContainer;

    this.pCommonUse();
    this.pCommonEvent();

    // 初始化侧边栏
    this.pStencil();

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

    // 历史记录
    this.use(new History({ enabled: true }));
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

    this.bindKey(KeyCommand.UNDO, () => {
      if (this.canUndo()) {
        this.undo();
      }
    });

    this.bindKey(KeyCommand.REDO, () => {
      if (this.canRedo()) {
        this.redo();
      }
    });
  }

  private pStencil() {
    this.stencil = new Stencil({
      title: 'Stencil xxx',
      target: this,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      placeholder: 'Search by shape name',
      notFoundText: 'Not Found',
      collapsable: true,
      stencilGraphHeight: 0,
      groups: [
        { name: 'group1', title: 'Group 1' },
        { name: 'group2', title: 'Group 2' },
      ],
    });

    this.stencilContainer.appendChild(this.stencil.container);

    stencilLoad({ graph: this, stencil: this.stencil });
  }
}

export { FlowGraph };
