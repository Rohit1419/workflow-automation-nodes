import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [textHeight, setTextHeight] = useState('100px');
  const [textWidth, setTextWidth] = useState('200px');
  const [enableMarkdown, setEnableMarkdown] = useState(data?.enableMarkdown || false);
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
        description: 'Text processing with variables',
        handles: allHandles,
        bgColor: '#fffbeb',
        borderColor: '#f59e0b',
      }}
      style={{
        width: textWidth,
        minHeight: '100px',
      }}
    >
      <div className="w-full space-y-3 text-xs">
        {/* Text Input */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Text Content
          </label>
          <textarea 
            ref={textareaRef}
            value={currText} 
            onChange={handleTextChange}
            placeholder="Enter text with {{variables}}"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-gray-800 resize-none font-mono text-xs"
            style={{ 
              minHeight: '80px',
              maxHeight: '300px',
              height: textHeight,
              overflow: 'auto',
            }}
          />
        </div>

        {/* Markdown Toggle */}
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id={`markdown-${id}`}
            checked={enableMarkdown} 
            onChange={(e) => setEnableMarkdown(e.target.checked)}
            className="w-4 h-4 accent-amber-600 cursor-pointer"
          />
          <label 
            htmlFor={`markdown-${id}`}
            className="text-gray-700 font-semibold cursor-pointer"
          >
            Enable Markdown
          </label>
        </div>

        {/* Variables Display */}
        {variables.length > 0 && (
          <div className="space-y-2">
            <div className="text-gray-700 font-semibold">
              Variables ({variables.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {variables.map((varName) => (
                <div 
                  key={varName}
                  className="bg-amber-100 border border-amber-300 text-gray-800 px-2 py-1 rounded-md text-xs font-mono"
                >
                  {`{{ ${varName} }}`}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-2 mt-2">
          <p className="text-gray-700 text-xs leading-relaxed">
            <strong>Variables:</strong> {variables.length}
            {enableMarkdown && <span className="text-amber-600"> • Markdown Enabled</span>}
          </p>
        </div>
      </div>
    </BaseNode>
  );
}