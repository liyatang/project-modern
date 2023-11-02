import { useEffect, useRef } from 'react';
import { FlowGraph } from '@lib/flow';

const Demo = () => {
  const refDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refDom.current) {
      return;
    }

    const flowGraph = new FlowGraph({
      container: refDom.current,
    });

    flowGraph.addNode({
      id: 'node1',
      shape: 'flow-node',
      x: 40,
      y: 40,
      label: 'hello',
    });
    flowGraph.addNode({
      id: 'node2',
      shape: 'flow-node',
      x: 160,
      y: 180,
      label: 'world',
    });

    flowGraph.addEdge({
      shape: 'flow-edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
    });
  }, []);

  return (
    <div className="h-full w-full">
      <div ref={refDom} />
    </div>
  );
};

export default Demo;
