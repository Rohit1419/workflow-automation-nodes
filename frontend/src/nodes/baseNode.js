import { Handle, Position } from 'reactflow';
import { useStore } from '../store';


export const BaseNode = ({ id, data, children, style = {} }) => {
  const { deleteNode } = useStore();
  
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
    position: 'relative',
    ...style,
  };

  const handleDelete = () => {
    deleteNode(id);
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

      {/* Close Button */}
      <button
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          width: '20px',
          height: '20px',
          padding: '0',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'all 0.2s ease',
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#dc2626';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#ef4444';
          e.target.style.transform = 'scale(1)';
        }}
        title="Delete node"
      >
        ×
      </button>

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