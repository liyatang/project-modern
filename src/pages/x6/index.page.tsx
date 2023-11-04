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
    <div className="h-full w-full">
      <div ref={refDom} />
    </div>
  );
};

export default Demo;
