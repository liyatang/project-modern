import { useCallback, useEffect, useRef } from 'react';
import { FlowGraph, DndWrap } from '@lib/flow';

const Demo = () => {
  const refDom = useRef<HTMLDivElement | null>(null);
  const refDndDom = useRef<HTMLDivElement | null>(null);
  const refFlowGraph = useRef<FlowGraph | null>(null);

  const handleStartDrag = useCallback((e) => {
    if (!refFlowGraph.current || !refFlowGraph.current.dnd) {
      return;
    }

    const node = refFlowGraph.current.createNode({
      width: 100,
      height: 40,
      label: 'Rect',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    });

    refFlowGraph.current.dnd.start(node, e.nativeEvent);
  }, []);

  useEffect(() => {
    if (!refDom.current || !refDndDom.current) {
      return;
    }

    const flowGraph = new FlowGraph(
      {
        container: refDom.current,
      },
      {
        dndContainer: refDndDom.current,
      },
    );

    refFlowGraph.current = flowGraph;

    const node1 = flowGraph.addNode({
      shape: 'flow-node',
      x: 40,
      y: 40,
      label: 'hello',
    });

    const node2 = flowGraph.addNode({
      shape: 'flow-node',
      x: 160,
      y: 180,
      label: 'world',
    });

    flowGraph.addEdge({
      shape: 'flow-edge',
      source: node1.id,
      target: node2.id,
      label: 'x6',
    });

    flowGraph.on('node:click', ({ node }) => {
      console.log('node:click', node);
    });
  }, []);

  return (
    <div className="flex h-full w-full">
      <div className="h-full w-[300px]">
        <DndWrap onStartDrag={handleStartDrag} ref={refDndDom} />
      </div>
      <div className="h-full flex-1">
        <div ref={refDom} />
      </div>
    </div>
  );
};

export default Demo;
