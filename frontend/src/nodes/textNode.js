import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handles = [
    { id: 'output', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Text',
        description: 'Text input node',
        handles: handles,
        bgColor: '#fff3e0',
        borderColor: '#ff9800',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange}
            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '11px' }}
          />
        </label>
      </div>
    </BaseNode>
  );
}