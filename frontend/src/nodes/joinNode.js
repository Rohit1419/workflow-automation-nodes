import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const JoinNode = ({ id, data }) => {
  const [joinType, setJoinType] = useState(data?.joinType || 'inner');
  const [joinKey, setJoinKey] = useState(data?.joinKey || 'id');

  const handles = [
    { id: 'input1', type: 'target', position: Position.Left, style: { top: '30%' } },
    { id: 'input2', type: 'target', position: Position.Left, style: { top: '70%' } },
    { id: 'output', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Join',
        description: 'Merge two data sources',
        handles: handles,
        bgColor: '#e0f2f1',
        borderColor: '#009688',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Join Type:
          <select 
            value={joinType} 
            onChange={(e) => setJoinType(e.target.value)}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="inner">Inner</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="outer">Outer</option>
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Join Key:
          <input 
            type="text" 
            value={joinKey} 
            onChange={(e) => setJoinKey(e.target.value)}
            placeholder="key field"
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
      </div>
    </BaseNode>
  );
}