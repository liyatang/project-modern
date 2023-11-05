import { useCallback } from 'react';
import { FlowGraphApp } from '@lib/flow';

const Demo = () => {
  const handleReady = useCallback((flowGraph) => {
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
  }, []);

  return (
    <div className="h-full w-full">
      <FlowGraphApp onReady={handleReady} />
    </div>
  );
};

export default Demo;
