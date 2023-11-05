import { useEffect, useRef } from 'react';
import { FlowGraph } from './base/graph';

interface FlowGraphAppProps {
  onReady?: (flowGraph: FlowGraph) => void;
}

function FlowGraphApp(props: FlowGraphAppProps) {
  const { onReady } = props;
  const refDom = useRef<HTMLDivElement | null>(null);
  const refStencil = useRef<HTMLDivElement | null>(null);

  // 规避 onReady 闭包问题
  const refReady = useRef(onReady);
  useEffect(() => {
    refReady.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (!refDom.current || !refStencil.current) {
      return;
    }

    const flowGraph = new FlowGraph(
      {
        container: refDom.current,
      },
      {
        stencilContainer: refStencil.current,
      },
    );

    if (refReady.current) {
      refReady.current(flowGraph);
    }

    // @ts-ignore
    window.__x6_instances__ = [flowGraph];
  }, []);

  return (
    <div className="flex h-full w-full">
      <div ref={refStencil} className="relative h-full w-[300px]" />
      <div className="h-full flex-1">
        <div ref={refDom} />
      </div>
    </div>
  );
}

export { FlowGraphApp };
