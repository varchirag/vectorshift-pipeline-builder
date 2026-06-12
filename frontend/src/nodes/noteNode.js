// noteNode.js
// Annotation / sticky-note node – no handles, purely informational

import { useState } from 'react';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add notes here...');

  return (
    <div className="note-node">
      <div className="note-node-header">📝 Note</div>
      <textarea
        className="note-textarea"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add notes here..."
      />
    </div>
  );
};
