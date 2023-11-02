import type { Edge } from '@antv/x6';
import { Graph } from '@antv/x6';

const flowEdge: Edge.Metadata = {
  inherit: 'edge',
  attrs: {
    line: {
      stroke: '#8f8f8f',
      strokeWidth: 1,
    },
  },
};

Graph.registerEdge('flow-edge', flowEdge, true);
