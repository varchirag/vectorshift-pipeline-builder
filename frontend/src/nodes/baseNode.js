// baseNode.js
// Generic wrapper component for all pipeline nodes

import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
  headerColor = '#7c3aed',
}) => {
  return (
    <div className="base-node">
      <div className="base-node-header" style={{ background: headerColor }}>
        {title}
      </div>
      <div className="base-node-body">{children}</div>

      {inputs.map((input, i) => (
        <Handle
          key={`${id}-in-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={
            input.style || {
              top:
                inputs.length > 1
                  ? `${((i + 1) / (inputs.length + 1)) * 100}%`
                  : '50%',
            }
          }
        />
      ))}

      {outputs.map((output, i) => (
        <Handle
          key={`${id}-out-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={
            output.style || {
              top:
                outputs.length > 1
                  ? `${((i + 1) / (outputs.length + 1)) * 100}%`
                  : '50%',
            }
          }
        />
      ))}
    </div>
  );
};
