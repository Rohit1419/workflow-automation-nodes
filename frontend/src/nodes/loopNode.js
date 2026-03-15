import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LoopNode = ({ id, data }) => {
  const [iterVar, setIterVar] = useState(data?.iterVar || 'item');
  const [maxIterations, setMaxIterations] = useState(data?.maxIterations || 100);
  const [loopType, setLoopType] = useState(data?.loopType || 'forEach');
  const [breakOnCondition, setBreakOnCondition] = useState(data?.breakOnCondition || '');
  const breakConditionRef = useRef(null);

  const loopTypes = [
    { value: 'forEach', label: 'For Each' },
    { value: 'while', label: 'While Loop' },
    { value: 'doWhile', label: 'Do While' },
  ];

  // Auto-resize break condition textarea
  useEffect(() => {
    if (breakConditionRef.current) {
      breakConditionRef.current.style.height = 'auto';
      breakConditionRef.current.style.height = Math.max(36, breakConditionRef.current.scrollHeight) + 'px';
    }
  }, [breakOnCondition]);

  const handles = [
    { id: 'input', type: 'target', position: Position.Left, style: { top: '20%' } },
    { id: 'body', type: 'source', position: Position.Right, style: { top: '40%' } },
    { id: 'break', type: 'source', position: Position.Right, style: { top: '60%' } },
    { id: 'output', type: 'source', position: Position.Right, style: { top: '80%' } }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Loop',
        description: 'Iterate over collections',
        handles: handles,
        bgColor: '#fff8e1',
        borderColor: '#fbc02d',
      }}
    >
      <div className="w-full space-y-3 text-xs">
        {/* Loop Type */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Loop Type
          </label>
          <select 
            value={loopType} 
            onChange={(e) => setLoopType(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-gray-800"
          >
            {loopTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Iterator Variable */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Iterator Variable
          </label>
          <input 
            type="text" 
            value={iterVar} 
            onChange={(e) => setIterVar(e.target.value)}
            placeholder="e.g., item"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-gray-800"
          />
        </div>

        {/* Max Iterations */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Max Iterations
          </label>
          <input 
            type="number" 
            value={maxIterations} 
            onChange={(e) => setMaxIterations(parseInt(e.target.value) || 0)}
            min="1"
            max="10000"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-gray-800"
          />
        </div>

        {/* Break Condition */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Break Condition
          </label>
          <textarea 
            ref={breakConditionRef}
            value={breakOnCondition} 
            onChange={(e) => setBreakOnCondition(e.target.value)}
            placeholder="e.g., item.done === true"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-gray-800 font-mono text-xs resize-none overflow-hidden"
            style={{ minHeight: '36px' }}
          />
        </div>

        {/* Info Box */}
        <div className="bg-yellow-50 w-auto border border-yellow-200 rounded-md p-2 mt-2">
          <p className="text-gray-700 text-xs leading-relaxed">
            <strong>Type:</strong> {loopTypes.find(t => t.value === loopType)?.label}
            <br />
            <strong>Variable:</strong> {iterVar}
            <br />
            <strong>Max:</strong> {maxIterations} iterations
            {breakOnCondition && <span className="text-yellow-700"> • Break condition set</span>}
          </p>
        </div>
      </div>
    </BaseNode>
  );
}