import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  const [filterField, setFilterField] = useState(data?.filterField || 'field');
  const [filterValue, setFilterValue] = useState(data?.filterValue || 'value');
  const [filterType, setFilterType] = useState(data?.filterType || 'equals');
  const [caseSensitive, setCaseSensitive] = useState(data?.caseSensitive || false);
  const [combineWith, setCombineWith] = useState(data?.combineWith || 'and');

  const filterTypes = [
    { value: 'equals', label: 'Equals' },
    { value: 'notEquals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'notContains', label: 'Not Contains' },
    { value: 'greater', label: 'Greater Than' },
    { value: 'less', label: 'Less Than' },
    { value: 'greaterEqual', label: 'Greater or Equal' },
    { value: 'lessEqual', label: 'Less or Equal' },
  ];

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
        bgColor: '#faf5ff',
        borderColor: '#a855f7',
      }}
    >
      <div className="w-full space-y-3 text-xs">
        {/* Filter Field */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Field Name
          </label>
          <input 
            type="text" 
            value={filterField} 
            onChange={(e) => setFilterField(e.target.value)}
            placeholder="e.g., age"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800"
          />
        </div>

        {/* Filter Type */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Condition
          </label>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800"
          >
            {filterTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Value */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Value
          </label>
          <input 
            type="text" 
            value={filterValue} 
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="filter value"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800"
          />
        </div>

        {/* Case Sensitive */}
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id={`case-${id}`}
            checked={caseSensitive} 
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-4 h-4 accent-purple-600 cursor-pointer"
          />
          <label 
            htmlFor={`case-${id}`}
            className="text-gray-700 font-semibold cursor-pointer"
          >
            Case Sensitive
          </label>
        </div>

        {/* Combine With */}
        <div className="space-y-1 pt-2 border-t border-gray-200">
          <label className="block text-gray-700 font-semibold">
            Multiple Filters
          </label>
          <select 
            value={combineWith} 
            onChange={(e) => setCombineWith(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800"
          >
            <option value="and">AND (all must match)</option>
            <option value="or">OR (any can match)</option>
          </select>
        </div>

        {/* Info Box */}
        <div className="bg-purple-50 border border-purple-200 rounded-md p-2 mt-2">
          <p className="text-gray-700 text-xs leading-relaxed">
            <strong>Filter:</strong> {filterField} {filterTypes.find(t => t.value === filterType)?.label}
            <br />
            <strong>Value:</strong> {filterValue}
            {caseSensitive && <span className="text-purple-600"> • Case Sensitive</span>}
          </p>
        </div>
      </div>
    </BaseNode>
  );
}