import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    { id: 'value', type: 'target', position: Position.Left }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Output',
        description: 'Output node',
        handles: handles,
        bgColor: '#ffe8e8',
        borderColor: '#f44336',
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
            value={outputType} 
            onChange={handleTypeChange}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}