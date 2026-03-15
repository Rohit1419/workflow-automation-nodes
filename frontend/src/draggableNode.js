import { useState } from 'react';

export const DraggableNode = ({ type, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`
        px-4 py-3 
        rounded-lg 
        border-2 border-gray-400
        bg-white
        hover:bg-blue-50 
        hover:border-blue-500
        hover:shadow-lg
        transition-all duration-200 ease-in-out
        transform hover:scale-105
        cursor-grab active:cursor-grabbing
        font-medium text-gray-700
        hover:text-blue-700
        text-center
        min-w-[90px]
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
    >
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
};