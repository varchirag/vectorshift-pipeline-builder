// submit.js
// Sends the current pipeline to the FastAPI backend and displays the analysis result

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const { nodes, edges } = useStore(
    (state) => ({ nodes: state.nodes, edges: state.edges }),
    shallow
  );

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: nodes.map((n) => ({ id: n.id })),
          edges: edges.map((e) => ({ source: e.source, target: e.target })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-area">
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Analyzing…' : 'Submit Pipeline'}
      </button>

      {result && (
        <div className="result-card">
          <span className="result-item">
            <span className="result-label">Nodes</span>
            <span className="result-value">{result.num_nodes}</span>
          </span>
          <span className="result-separator">|</span>
          <span className="result-item">
            <span className="result-label">Edges</span>
            <span className="result-value">{result.num_edges}</span>
          </span>
          <span className="result-separator">|</span>
          <span className="result-item">
            <span className="result-label">Is DAG</span>
            <span className={`result-value ${result.is_dag ? 'is-dag-true' : 'is-dag-false'}`}>
              {result.is_dag ? '✓ Yes' : '✗ No'}
            </span>
          </span>
        </div>
      )}

      {error && (
        <div className="result-error">⚠ {error}</div>
      )}
    </div>
  );
};

