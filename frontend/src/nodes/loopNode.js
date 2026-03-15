import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LoopNode = ({ id, data }) => {
  const [iterVar, setIterVar] = useState(data?.iterVar || 'item');
  const [maxIterations, setMaxIterations] = useState(data?.maxIterations || '100');

  const handles = [
    { id: 'input', type: 'target', position: Position.Left, style: { top: '25%' } },
    { id: 'body', type: 'source', position: Position.Right, style: { top: '50%' } },
    { id: 'output', type: 'source', position: Position.Right, style: { top: '75%' } }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Loop',
        description: 'Iterate over collection',
        handles: handles,
        bgColor: '#fff8e1',
        borderColor: '#fbc02d',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Iterator Variable:
          <input 
            type="text" 
            value={iterVar} 
            onChange={(e) => setIterVar(e.target.value)}
            placeholder="variable name"
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Max Iterations:
          <input 
            type="number" 
            value={maxIterations} 
            onChange={(e) => setMaxIterations(e.target.value)}
            placeholder="limit"
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
      </div>
    </BaseNode>
  );
}