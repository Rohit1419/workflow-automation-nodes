import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const APINode = ({ id, data }) => {
  const [endpoint, setEndpoint] = useState(data?.endpoint || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');
  const [headers, setHeaders] = useState(data?.headers || '');
  const [timeout, setTimeout] = useState(data?.timeout || 30);
  const [authentication, setAuthentication] = useState(data?.authentication || 'none');
  const endpointRef = useRef(null);
  const headersRef = useRef(null);

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'];
  const authTypes = [
    { value: 'none', label: 'None' },
    { value: 'basic', label: 'Basic Auth' },
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'apikey', label: 'API Key' },
  ];

  // Auto-resize endpoint input
  useEffect(() => {
    if (endpointRef.current) {
      endpointRef.current.style.height = 'auto';
      endpointRef.current.style.height = Math.max(36, endpointRef.current.scrollHeight) + 'px';
    }
  }, [endpoint]);

  // Auto-resize headers textarea
  useEffect(() => {
    if (headersRef.current) {
      headersRef.current.style.height = 'auto';
      headersRef.current.style.height = Math.max(56, headersRef.current.scrollHeight) + 'px';
    }
  }, [headers]);

  const handles = [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'API Request',
        description: 'Call external API endpoints',
        handles: handles,
        bgColor: '#fce4ec',
        borderColor: '#e91e63',
      }}
    >
      <div className="w-full space-y-3 text-xs">
        {/* Endpoint */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Endpoint URL
          </label>
          <textarea 
            ref={endpointRef}
            value={endpoint} 
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.example.com/data"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-800 font-mono text-xs resize-none overflow-hidden"
            style={{ minHeight: '36px' }}
          />
        </div>

        {/* Method */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            HTTP Method
          </label>
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-800"
          >
            {methods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Authentication */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Authentication
          </label>
          <select 
            value={authentication} 
            onChange={(e) => setAuthentication(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-800"
          >
            {authTypes.map(auth => (
              <option key={auth.value} value={auth.value}>{auth.label}</option>
            ))}
          </select>
        </div>

        {/* Headers */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Custom Headers (JSON)
          </label>
          <textarea 
            ref={headersRef}
            value={headers} 
            onChange={(e) => setHeaders(e.target.value)}
            placeholder='{"X-Custom": "value", "Authorization": "Bearer token"}'
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-800 resize-none overflow-hidden font-mono text-xs"
            style={{ minHeight: '56px' }}
          />
        </div>

        {/* Timeout */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Timeout (seconds)
          </label>
          <input 
            type="number" 
            value={timeout} 
            onChange={(e) => setTimeout(parseInt(e.target.value) || 0)}
            min="1"
            max="300"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-800"
          />
        </div>

        {/* Info Box */}
        <div className="bg-pink-50 border border-pink-200 rounded-md p-2 mt-2">
          <p className="text-gray-700 text-xs leading-relaxed">
            <strong>Method:</strong> {method}
            <br />
            <strong>Auth:</strong> {authTypes.find(a => a.value === authentication)?.label}
            <br />
            <strong>Timeout:</strong> {timeout}s
          </p>
        </div>
      </div>
    </BaseNode>
  );
}