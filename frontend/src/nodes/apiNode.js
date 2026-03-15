import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const APINode = ({ id, data }) => {
  const [endpoint, setEndpoint] = useState(data?.endpoint || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  const handles = [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'API',
        description: 'Call external API',
        handles: handles,
        bgColor: '#fce4ec',
        borderColor: '#e91e63',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Endpoint:
          <input 
            type="text" 
            value={endpoint} 
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="API URL"
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '10px' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Method:
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}