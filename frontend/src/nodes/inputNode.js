import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    { id: 'value', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Input',
        description: 'Input node',
        handles: handles,
        bgColor: '#e8f5e9',
        borderColor: '#4caf50',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Type:
          <select 
            value={inputType} 
            onChange={handleTypeChange}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}