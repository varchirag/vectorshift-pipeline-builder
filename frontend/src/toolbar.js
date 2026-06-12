// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <span className="toolbar-label">Nodes</span>
      <DraggableNode type="customInput"  label="Input"  color="#10b981" />
      <DraggableNode type="customOutput" label="Output" color="#f59e0b" />
      <DraggableNode type="llm"          label="LLM"    color="#7c3aed" />
      <DraggableNode type="text"         label="Text"   color="#3b82f6" />
      <DraggableNode type="filter"       label="Filter" color="#ef4444" />
      <DraggableNode type="math"         label="Math"   color="#f97316" />
      <DraggableNode type="note"         label="Note"   color="#854d0e" />
    </div>
  );
};

