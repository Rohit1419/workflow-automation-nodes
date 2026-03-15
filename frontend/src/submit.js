import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
        }),
        shallow
    );

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

            // Display alert with results
            alert(
                `Pipeline Analysis:\n\n` +
                `📊 Nodes: ${data.num_nodes}\n` +
                `🔗 Edges: ${data.num_edges}\n` +
                `✓ Valid DAG: ${data.is_dag ? 'Yes ✅' : 'No ❌'}`
            );
        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error('Submit error:', error);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
            <button 
                type="submit"
                onClick={handleSubmit}
                style={{
                    padding: '10px 20px',
                    fontSize: '14px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
}