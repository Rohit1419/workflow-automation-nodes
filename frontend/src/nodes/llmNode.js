import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);
  const [maxTokens, setMaxTokens] = useState(data?.maxTokens || 2000);
  const [systemPrompt, setSystemPrompt] = useState(data?.systemPrompt || 'You are a helpful assistant.');
  const systemPromptRef = useRef(null);

  const models = [
    { value: 'gpt-5.1', label: 'GPT-5.1' },
    { value: 'gpt-5-mini', label: 'GPT-5 Mini' },
    { value: 'claude-4.6-opus', label: 'Claude 4.6 Opus' },
    { value: 'claude-4.7-sonnet', label: 'Claude 4.7 Sonnet' },
    { value: 'mistral-large', label: 'Mistral Large' },
    { value: 'llama-2', label: 'Llama 2' },
    { value: 'self-hosted', label: 'Custom (Self-Hosted)' },
    { value: 'qwen2', label: 'Qwen 2' },
  ];

  const handles = [
    { id: 'system', type: 'target', position: Position.Left, style: { top: '20%' } },
    { id: 'prompt', type: 'target', position: Position.Left, style: { top: '60%' } },
    { id: 'response', type: 'source', position: Position.Right }
  ];

  // Auto-resize system prompt textarea
  useEffect(() => {
    if (systemPromptRef.current) {
      systemPromptRef.current.style.height = 'auto';
      systemPromptRef.current.style.height = Math.max(64, systemPromptRef.current.scrollHeight) + 'px';
    }
  }, [systemPrompt]);

  const handleTemperatureChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 2) {
      setTemperature(value);
    }
  };

  return (
    <BaseNode 
      id={id} 
      data={{
        label: 'Language Model',
        description: 'Process text with LLM',
        handles: handles,
        bgColor: '#f0f4ff',
        borderColor: '#6366f1',
      }}
    >
      <div className="w-full space-y-3 text-xs">
        {/* Model Selection */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Model
          </label>
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
          >
            {models.map(m => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Temperature */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Temperature (0-2)
          </label>
          <input 
            type="number" 
            min="0" 
            max="2" 
            step="0.1"
            value={temperature}
            onChange={handleTemperatureChange}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
          />
          <p className="text-gray-600 text-xs mt-1">
            {temperature < 0.5 ? '❄️ Deterministic' : temperature < 1.5 ? '⚖️ Balanced' : '🔥 Creative'}
          </p>
        </div>

        {/* Max Tokens */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            Max Tokens
          </label>
          <input 
            type="number" 
            value={maxTokens} 
            onChange={(e) => setMaxTokens(parseInt(e.target.value) || 0)}
            min="1"
            max="4000"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
          />
        </div>

        {/* System Prompt */}
        <div className="space-y-1">
          <label className="block text-gray-700 font-semibold">
            System Prompt
          </label>
          <textarea 
            ref={systemPromptRef}
            value={systemPrompt} 
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Define model behavior..."
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800 resize-none overflow-hidden"
            style={{ minHeight: '64px' }}
          />
        </div>

        {/* Info Box */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-md p-2 mt-2">
          <p className="text-gray-700 text-xs leading-relaxed">
            <strong>Model:</strong> {models.find(m => m.value === model)?.label}
            <br />
            <strong>Temp:</strong> {temperature.toFixed(2)} • <strong>Tokens:</strong> {maxTokens}
          </p>
        </div>
      </div>
    </BaseNode>
  );
}