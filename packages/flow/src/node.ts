import type { Node } from '@antv/x6';
import { Graph } from '@antv/x6';
import AntV from './images/antv.png';

console.log(AntV);

const flowNode: Node.Metadata = {
  inherit: 'rect',
  width: 100,
  height: 50,
  markup: [
    {
      tagName: 'rect', // 标签名称
      selector: 'body', // 选择器
    },
    {
      tagName: 'image',
      selector: 'img',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  attrs: {
    body: {
      stroke: '#8f8f8f',
      strokeWidth: 1,
      fill: '#fff',
      rx: 6,
      ry: 6,
    },
    img: {
      'xlink:href': AntV,
      width: 16,
      height: 16,
      x: 12,
      y: 15,
    },
  },
};

Graph.registerNode('flow-node', flowNode, true);
