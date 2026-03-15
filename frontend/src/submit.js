import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      // Prepare data
      const pipelineData = {
        nodes: nodes,
        edges: edges,
      };

      // Send POST request to backend
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setShowResult(true);
      
      setTimeout(() => setShowResult(false), 4000);
    } catch (error) {
      setResult({ error: error.message });
      setShowResult(true);
      setTimeout(() => setShowResult(false), 4000);
    }
  };

  return (
    <>
      {/* Submit Button - Top Right */}
      <button
        onClick={handleSubmit}
        className="
          fixed top-6 right-6 z-50
          px-6 py-2.5
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-semibold
          text-sm
          rounded-lg
          transition-all duration-200
          hover:shadow-lg
          active:scale-95
          shadow-md
        "
      >
        Submit
      </button>

      {/* Result Popup - Below Button */}
      {showResult && result && (
        <div className="fixed top-20 right-6 z-50 w-60 bg-white rounded-lg shadow-xl border-l-4 border-blue-600 p-4 animate-fade-in">
          {result.error ? (
            <div>
              <div className="text-red-600 font-bold text-lg mb-2">Error ❌</div>
              <div className="text-gray-700 text-sm">{result.error}</div>
            </div>
          ) : (
            <div>
              <div className="text-blue-600 font-bold text-lg mb-3">Workflow Valid</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nodes:</span>
                  <span className="font-semibold text-gray-800">{result.num_nodes}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Edges:</span>
                  <span className="font-semibold text-gray-800">{result.num_edges}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-600">DAG Valid:</span>
                  <span className={`font-semibold ${result.is_dag ? 'text-blue-600' : 'text-red-600'}`}>
                    {result.is_dag ? 'Yes ' : 'Oh no, cycle detected! '}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};