import { Handle, Position } from 'reactflow';

/**
 * BaseNode - Reusable node template
 * 
 * @param {string} id - Node ID
 * @param {object} data - Node data
 * @param {string} data.label - Node title (e.g., "Input", "Output")
 * @param {string} data.description - Node description
 * @param {array} data.handles - Array of handle configurations
 * @param {ReactNode} data.content - Custom content to render
 * @param {object} style - Custom styles
 */
export const BaseNode = ({ id, data, children, style = {} }) => {
  const {
    label = 'Node',
    description = '',
    handles = [],
    bgColor = '#ffffff',
    borderColor = '#000000',
  } = data;

  const defaultStyle = {
    width: '200px',
    minHeight: '80px',
    border: `2px solid ${borderColor}`,
    borderRadius: '8px',
    backgroundColor: bgColor,
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    ...style,
  };

  return (
    <div style={defaultStyle}>
      {/* Render all handles */}
      {handles.map((handle, idx) => (
        <Handle
          key={`${id}-${handle.id}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style || {}}
        />
      ))}

      {/* Node Header */}
      <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
        {label}
      </div>

      {/* Node Description */}
      {description && (
        <div style={{ fontSize: '12px', color: '#666' }}>
          {description}
        </div>
      )}

      {/* Custom Content */}
      {children}
    </div>
  );
};