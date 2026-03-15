import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'string');
  const [isRequired, setIsRequired] = useState(data?.isRequired || false);
  const [description, setDescription] = useState(data?.description || 'Configure output parameters');
  const [saveToFile, setSaveToFile] = useState(data?.saveToFile || false);

  const outputTypes = [
    { value: 'string', label: 'String (Text)' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'array', label: 'Array' },
    { value: 'object', label: 'Object' },
    { value: 'file', label: 'File' },
    { value: 'image', label: 'Image' },
    { value: 'audio', label: 'Audio' },
    { value: 'video', label: 'Video' },
    { value: 'json', label: 'JSON' },
  ];

  const handles = [
    { id: 'value', type: 'target', position: Position.Left }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Output',
        description: 'Define output parameters',
        handles: handles,
        bgColor: '#fef2f2',
        borderColor: '#dc2626',
      }}
    >
      <div className="w-full space-y-3 text-xs">
        {/* Output Name */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Output Name
          </label>
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)}
            placeholder="e.g., result"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-800"
          />
        </div>

        {/* Output Type */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Data Type
          </label>
          <select 
            value={outputType} 
            onChange={(e) => setOutputType(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-800"
          >
            {outputTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Description
          </label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this output..."
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-800 resize-none h-16"
          />
        </div>

        {/* Required Checkbox */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
          <input 
            type="checkbox" 
            id={`required-${id}`}
            checked={isRequired} 
            onChange={(e) => setIsRequired(e.target.checked)}
            className="w-4 h-4 accent-red-600 cursor-pointer"
          />
          <label 
            htmlFor={`required-${id}`}
            className="text-gray-700 font-semibold cursor-pointer"
          >
            Required Output
          </label>
          {isRequired && (
            <span className="ml-auto text-red-500 font-bold">*</span>
          )}
        </div>

        {/* Save to File Checkbox */}
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id={`save-${id}`}
            checked={saveToFile} 
            onChange={(e) => setSaveToFile(e.target.checked)}
            className="w-4 h-4 accent-red-600 cursor-pointer"
          />
          <label 
            htmlFor={`save-${id}`}
            className="text-gray-700 font-semibold cursor-pointer"
          >
            Save to File
          </label>
        </div>

        {/* Info Box */}
        <div className="bg-red-50 border border-red-200 rounded-md p-2 mt-2">
          <p className="text-gray-700 text-xs leading-relaxed">
            <strong>Type:</strong> {outputTypes.find(t => t.value === outputType)?.label}
            {isRequired && <span className="text-red-600"> • Required</span>}
            {saveToFile && <span className="text-red-600"> • Save to File</span>}
          </p>
        </div>
      </div>
    </BaseNode>
  );
}