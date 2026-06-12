// draggableNode.js

export const DraggableNode = ({ type, label, color = '#1C2536' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{ background: color }}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
