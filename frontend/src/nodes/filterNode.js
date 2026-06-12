// filterNode.js
// Filters data based on a condition; outputs to true or false path

import { useState } from 'react';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'true' }, { id: 'false' }]}
      headerColor="#ef4444"
    >
      <div className="node-field">
        <label className="node-label">Condition</label>
        <input
          className="node-input"
          type="text"
          value={condition}
          placeholder="e.g. value > 10"
          onChange={(e) => setCondition(e.target.value)}
        />
      </div>
      <div className="node-output-tags">
        <span className="tag-true">✓ True (top)</span>
        <span className="tag-false">✗ False (bottom)</span>
      </div>
    </BaseNode>
  );
};
