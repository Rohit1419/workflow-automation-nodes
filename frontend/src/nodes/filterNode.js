import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  const [filterField, setFilterField] = useState(data?.filterField || 'field');
  const [filterValue, setFilterValue] = useState(data?.filterValue || 'value');
  const [filterType, setFilterType] = useState(data?.filterType || 'equals');

  const handles = [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Filter',
        description: 'Filter data based on conditions',
        handles: handles,
        bgColor: '#f3e5f5',
        borderColor: '#9c27b0',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Field:
          <input 
            type="text" 
            value={filterField} 
            onChange={(e) => setFilterField(e.target.value)}
            placeholder="field name"
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Type:
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
            <option value="greater">Greater Than</option>
            <option value="less">Less Than</option>
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Value:
          <input 
            type="text" 
            value={filterValue} 
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="filter value"
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
      </div>
    </BaseNode>
  );
}