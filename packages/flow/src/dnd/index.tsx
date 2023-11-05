import { useCallback, forwardRef } from 'react';

function DndItem(props) {
  const { ...rest } = props;
  return (
    <div {...rest} className="dnd-item">
      Rect
    </div>
  );
}

interface DndProps {
  onStartDrag: (e: MouseEvent) => void;
}

function BaseDndWrap(props: DndProps, ref) {
  const { onStartDrag } = props;

  const handleMouseDown = useCallback(
    (e) => {
      onStartDrag(e);
    },
    [onStartDrag],
  );

  return (
    <div ref={ref} className="dnd-warp h-full w-full">
      <DndItem onMouseDown={handleMouseDown} />
    </div>
  );
}

const DndWrap = forwardRef(BaseDndWrap);

export { DndWrap };
