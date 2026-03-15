import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [textHeight, setTextHeight] = useState('100px');
  const [textWidth, setTextWidth] = useState('200px');
  const textareaRef = useRef(null);

  // Extract variables from text using regex pattern {{ variableName }}
  const extractVariables = (text) => {
    const variablePattern = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    
    while ((match = variablePattern.exec(text)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    
    return matches;
  };

  // Update variables whenever text changes
  useEffect(() => {
    const extractedVars = extractVariables(currText);
    setVariables(extractedVars);
  }, [currText]);

  // Auto-resize textarea height based on scroll height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.max(100, scrollHeight);
      setTextHeight(`${newHeight}px`);
    }
  }, [currText]);

  // Calculate dynamic width based on text length
  useEffect(() => {
    const maxLineLength = Math.max(
      ...currText.split('\n').map(line => line.length)
    );
    const estimatedWidth = Math.max(200, 60 + maxLineLength * 7);
    setTextWidth(`${Math.min(estimatedWidth, 400)}px`);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create dynamic handles for each variable
  const variableHandles = variables.map((varName, index) => ({
    id: `var-${varName}`,
    type: 'target',
    position: Position.Left,
    style: { top: `${30 + index * 20}%` }
  }));

  // Combine static output handle with variable handles
  const allHandles = [
    ...variableHandles,
    { id: 'output', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Text',
        description: 'Text input with variables',
        handles: allHandles,
        bgColor: '#fff3e0',
        borderColor: '#ff9800',
      }}
      style={{
        width: textWidth,
        minHeight: '100px',
        maxHeight: "auto",
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Text:
          <textarea 
            ref={textareaRef}
            value={currText} 
            onChange={handleTextChange}
            style={{ 
              padding: '6px', 
              borderRadius: '4px', 
              border: '1px solid #ccc', 
              fontSize: '11px',
              minHeight: '80px',
              maxHeight: '300px',
              minWidth: '150px',
              fontFamily: 'monospace',
              resize: 'none',
              overflow: 'auto',
              height: textHeight,
              boxSizing: 'border-box'
            }}
          />
        </label>

        {/* Display variables info */}
        {variables.length > 0 && (
          <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
            <strong>Variables:</strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
              {variables.map((varName) => (
                <div 
                  key={varName}
                  style={{ 
                    backgroundColor: '#fff9c4', 
                    padding: '2px 6px', 
                    borderRadius: '3px',
                    fontSize: '10px'
                  }}
                >
                  {`{{ ${varName} }}`}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseNode>
  );
}