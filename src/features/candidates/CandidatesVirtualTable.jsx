import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export default function CandidatesVirtualTable({ rows, rowHeight=56 }) {
  const parentRef = useRef(null);
  const virtual = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 12
  });

  return (
    <div ref={parentRef} className="h-[70vh] overflow-auto border rounded-lg">
      <div style={{ height: virtual.getTotalSize(), position: 'relative' }}>
        {virtual.getVirtualItems().map(item => {
          const c = rows[item.index];
          return (
            <div key={c.id} className="px-3 flex items-center gap-3 border-b absolute left-0 right-0"
                 style={{ height: item.size, transform:`translateY(${item.start}px)` }}>
              <div className="w-64 truncate">{c.name}</div>
              <div className="w-72 truncate text-gray-500">{c.email}</div>
              <div className="capitalize px-2 py-1 text-xs rounded bg-gray-100">{c.stage}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
