import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {

  const handles = [
    { id: 'system', type: 'target', position: Position.Left, style: { top: '33%' } },
    { id: 'prompt', type: 'target', position: Position.Left, style: { top: '66%' } },
    { id: 'response', type: 'source', position: Position.Right }
    
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'LLM',
        description: 'Language Model',
        handles: handles,
        bgColor: '#e3f2fd',
        borderColor: '#2196f3',
      }}
    >
      <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
        Process with LLM
      </div>
    </BaseNode>
  );
}