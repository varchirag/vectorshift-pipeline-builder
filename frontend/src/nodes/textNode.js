// textNode.js
// Text node with dynamic variable handles parsed from {{varName}} syntax

import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';

// Layout constants (pixels) – must match the CSS values below
const HEADER_H = 30;       // base-node-header height
const BODY_PAD_TOP = 10;   // base-node-body padding-top
const LABEL_H = 18;        // node-label + its margin-bottom
const TEXTAREA_MIN_H = 60; // node-textarea min-height
const FIELD_MARGIN_B = 8;  // node-field margin-bottom
const VARS_PAD_TOP = 8;    // node-variables padding-top
const VARS_TITLE_H = 18;   // variables-title + margin-bottom
const VAR_ROW_H = 24;      // each node-variable-row height

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [textareaH, setTextareaH] = useState(TEXTAREA_MIN_H);
  const textareaRef = useRef(null);

  // Parse unique variable names from {{varName}} patterns
  const variables = useMemo(() => {
    const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
    const found = [];
    const seen = new Set();
    let m;
    while ((m = regex.exec(currText)) !== null) {
      if (!seen.has(m[1])) {
        found.push(m[1]);
        seen.add(m[1]);
      }
    }
    return found;
  }, [currText]);

  // Auto-resize textarea and track its height for handle positioning
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const h = Math.max(textareaRef.current.scrollHeight, TEXTAREA_MIN_H);
      textareaRef.current.style.height = h + 'px';
      setTextareaH(h);
    }
  }, [currText]);

  // Calculate the pixel offset from the top of the node for each variable handle
  const getVarHandleTop = (i) => {
    const base =
      HEADER_H +
      BODY_PAD_TOP +
      LABEL_H +
      textareaH +
      FIELD_MARGIN_B +
      VARS_PAD_TOP +
      VARS_TITLE_H;
    return base + i * VAR_ROW_H + VAR_ROW_H / 2;
  };

  return (
    <div className="base-node" style={{ position: 'relative', minWidth: '220px' }}>
      <div className="base-node-header" style={{ background: '#3b82f6' }}>
        Text
      </div>
      <div className="base-node-body">
        <div className="node-field">
          <label className="node-label">Text</label>
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
          />
        </div>
        {variables.length > 0 && (
          <div className="node-variables">
            <div className="node-variables-title">Variables</div>
            {variables.map((v) => (
              <div key={v} className="node-variable-row">
                <span className="node-variable-name">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Static source handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '30%' }}
      />

      {/* Dynamic target handles – one per {{variable}} */}
      {variables.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{ top: `${getVarHandleTop(i)}px` }}
        />
      ))}
    </div>
  );
};
