// llmNode.js

import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[{ id: 'system' }, { id: 'prompt' }]}
      outputs={[{ id: 'response' }]}
      headerColor="#7c3aed"
    >
      <p className="node-description">Large Language Model</p>
      <div className="node-io-labels">
        <div className="node-input-labels">
          <span className="node-io-tag">system</span>
          <span className="node-io-tag">prompt</span>
        </div>
        <div className="node-output-labels">
          <span className="node-io-tag node-io-tag-out">response</span>
        </div>
      </div>
    </BaseNode>
  );
}
