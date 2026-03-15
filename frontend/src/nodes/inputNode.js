import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'string');
  const [isRequired, setIsRequired] = useState(data?.isRequired || false);
  const [defaultValue, setDefaultValue] = useState(data?.defaultValue || '');
  const [description, setDescription] = useState(data?.description || 'Configure input parameters');

  const inputTypes = [
    { value: 'string', label: 'String (Text)' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'array', label: 'Array' },
    { value: 'object', label: 'Object' },
    { value: 'file', label: 'File' },
    { value: 'email', label: 'Email' },
    { value: 'url', label: 'URL' },
  ];

  const handles = [
    { id: 'value', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Input',
        description: 'Define input parameters',
        handles: handles,
        bgColor: '#f0f9ff',
        borderColor: '#0284c7',
      }}
    >
      <div className="w-full space-y-3 text-xs">
        {/* Input Name */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Parameter Name
          </label>
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)}
            placeholder="e.g., username"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
        </div>

        {/* Input Type */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Data Type
          </label>
          <select 
            value={inputType} 
            onChange={(e) => setInputType(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          >
            {inputTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Default Value */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Default Value
          </label>
          <input 
            type="text" 
            value={defaultValue} 
            onChange={(e) => setDefaultValue(e.target.value)}
            placeholder="Optional default"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Description
          </label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add description..."
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 resize-none h-16"
          />
        </div>

        {/* Required Checkbox */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
          <input 
            type="checkbox" 
            id={`required-${id}`}
            checked={isRequired} 
            onChange={(e) => setIsRequired(e.target.checked)}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <label 
            htmlFor={`required-${id}`}
            className="text-gray-700 font-semibold cursor-pointer"
          >
            Required Parameter
          </label>
          {isRequired && (
            <span className="ml-auto text-red-500 font-bold">*</span>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-2 mt-2">
          <p className="text-gray-700 text-xs leading-relaxed">
            <strong>Type:</strong> {inputTypes.find(t => t.value === inputType)?.label}
            {isRequired && <span className="text-red-600"> • Required</span>}
          </p>
        </div>
      </div>
    </BaseNode>
  );
}