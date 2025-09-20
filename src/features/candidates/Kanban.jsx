
import React from 'react';
import { useDroppable, useDraggable, DndContext } from '@dnd-kit/core';

const STAGES = ['applied','screen','tech','offer','hired','rejected'];

function Column({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="card kanban-col"
      style={{ background: isOver ? '#eff6ff' : '#fff', minHeight: 200 }}
    >
      <h4 style={{ margin: '2px 0 10px 0', textTransform: 'capitalize' }}>{id}</h4>
      <div style={{ display: 'grid', gap: 8 }}>{children}</div>
    </div>
  );
}

function Card({ cand }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: cand.id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px,${transform.y}px,0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="kanban-tile"
      style={{ ...style, padding: '8px 10px' }}
    >
      <strong>{cand.name}</strong>
      <div style={{ fontSize: 12, color: '#6b7280' }}>{cand.email}</div>
    </div>
  );
}

export default function Kanban({ all, onMove }) {
  const grouped = STAGES.reduce((acc, s) => ({ ...acc, [s]: [] }), {});
  all.forEach((c) => grouped[c.stage]?.push(c));

  return (
    <DndContext
      onDragEnd={({ active, over }) => {
        if (over && over.id && active) onMove(active.id, over.id);
      }}
    >
      {/* Mobile = horizontal swipe (handled by .kanban CSS)
          Desktop = flex columns that fit inside the card */}
      <div className="kanban">
        {STAGES.map((s) => (
          <Column key={s} id={s}>
            {grouped[s].slice(0, 6).map((c) => (
              <Card key={c.id} cand={c} />
            ))}
          </Column>
        ))}
      </div>

      <p className="board-note">
        (Showing up to 6 cards per column for brevity. Use the list below to browse all.)
      </p>
    </DndContext>
  );
}
