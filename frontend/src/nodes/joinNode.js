import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const JoinNode = ({ id, data }) => {
  const [joinType, setJoinType] = useState(data?.joinType || 'inner');
  const [joinKey, setJoinKey] = useState(data?.joinKey || 'id');
  const [leftKey, setLeftKey] = useState(data?.leftKey || 'id');
  const [rightKey, setRightKey] = useState(data?.rightKey || 'id');
  const [keepBothKeys, setKeepBothKeys] = useState(data?.keepBothKeys || false);

  const joinTypes = [
    { value: 'inner', label: 'Inner Join', description: 'Only matching records' },
    { value: 'left', label: 'Left Join', description: 'All left + matching right' },
    { value: 'right', label: 'Right Join', description: 'All right + matching left' },
    { value: 'outer', label: 'Full Outer', description: 'All records from both' },
  ];

  const handles = [
    { id: 'input1', type: 'target', position: Position.Left, style: { top: '25%' } },
    { id: 'input2', type: 'target', position: Position.Left, style: { top: '75%' } },
    { id: 'output', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Join',
        description: 'Merge two data sources',
        handles: handles,
        bgColor: '#f0fdfa',
        borderColor: '#14b8a6',
      }}
    >
      <div className="w-full space-y-3 text-xs">
        {/* Join Type */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Join Type
          </label>
          <select 
            value={joinType} 
            onChange={(e) => setJoinType(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-800"
          >
            {joinTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <p className="text-gray-600 text-xs mt-1">
            {joinTypes.find(t => t.value === joinType)?.description}
          </p>
        </div>

        {/* Left Key */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Left Key (Input 1)
          </label>
          <input 
            type="text" 
            value={leftKey} 
            onChange={(e) => setLeftKey(e.target.value)}
            placeholder="join field"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-800"
          />
        </div>

        {/* Right Key */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Right Key (Input 2)
          </label>
          <input 
            type="text" 
            value={rightKey} 
            onChange={(e) => setRightKey(e.target.value)}
            placeholder="join field"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-800"
          />
        </div>

        {/* Keep Both Keys */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
          <input 
            type="checkbox" 
            id={`keep-keys-${id}`}
            checked={keepBothKeys} 
            onChange={(e) => setKeepBothKeys(e.target.checked)}
            className="w-4 h-4 accent-teal-600 cursor-pointer"
          />
          <label 
            htmlFor={`keep-keys-${id}`}
            className="text-gray-700 font-semibold cursor-pointer"
          >
            Keep Both Keys
          </label>
        </div>

        {/* Info Box */}
        <div className="bg-teal-50 border border-teal-200 rounded-md p-2 mt-2">
          <p className="text-gray-700 text-xs leading-relaxed">
            <strong>Type:</strong> {joinTypes.find(t => t.value === joinType)?.label}
            <br />
            <strong>Keys:</strong> {leftKey} ↔ {rightKey}
            {keepBothKeys && <span className="text-teal-600"> • Keep Both</span>}
          </p>
        </div>
      </div>
    </BaseNode>
  );
}