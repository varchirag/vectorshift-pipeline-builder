// mathNode.js
// Applies a math operation on two inputs and produces one output

import { useState } from 'react';
import { BaseNode } from './baseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <BaseNode
      id={id}
      title="Math"
      inputs={[{ id: 'a' }, { id: 'b' }]}
      outputs={[{ id: 'result' }]}
      headerColor="#f97316"
    >
      <div className="node-field">
        <label className="node-label">Operation</label>
        <select
          className="node-select"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (−)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
      </div>
      <div className="node-io-labels" style={{ marginTop: '6px' }}>
        <div className="node-input-labels">
          <span className="node-io-tag">a</span>
          <span className="node-io-tag">b</span>
        </div>
        <div className="node-output-labels">
          <span className="node-io-tag node-io-tag-out">result</span>
        </div>
      </div>
    </BaseNode>
  );
};
