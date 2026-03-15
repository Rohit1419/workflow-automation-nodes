// filepath: /home/stark/Code/VectorShift/frontend/src/nodes/databaseNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const DatabaseNode = ({ id, data }) => {
  const [table, setTable] = useState(data?.table || 'users');
  const [dbType, setDbType] = useState(data?.dbType || 'SQL');

  const handles = [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Database',
        description: 'Query database table',
        handles: handles,
        bgColor: '#e8eaf6',
        borderColor: '#3f51b5',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Database Type:
          <select 
            value={dbType} 
            onChange={(e) => setDbType(e.target.value)}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="SQL">SQL</option>
            <option value="MongoDB">MongoDB</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="MySQL">MySQL</option>
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Table/Collection:
          <input 
            type="text" 
            value={table} 
            onChange={(e) => setTable(e.target.value)}
            placeholder="table name"
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
      </div>
    </BaseNode>
  );
}