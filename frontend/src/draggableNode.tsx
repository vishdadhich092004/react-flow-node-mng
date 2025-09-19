interface DraggableNodeProps {
  type: string;
  label: string;
}

export const DraggableNode = ({ type, label }: DraggableNodeProps) => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
      const appData = { nodeType }
      event.currentTarget.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`${type} cursor-grab min-w-20 h-15 flex items-center rounded-lg bg-slate-800 justify-center flex-col`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.currentTarget.style.cursor = 'grab')}
        draggable
      >
          <span className="text-white">{label}</span>
      </div>
    );
  };
  