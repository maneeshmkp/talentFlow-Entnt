// import React, { useRef } from 'react';
// import { useVirtualizer } from '@tanstack/react-virtual';
// import { Link } from 'react-router-dom';

// export default function CandidatesVirtualTable({ rows, rowHeight=56 }) {
//   const parentRef = useRef(null);
//   const virtual = useVirtualizer({
//     count: rows.length,
//     getScrollElement: () => parentRef.current,
//     estimateSize: () => rowHeight,
//     overscan: 12
//   });

//   return (
//     <div ref={parentRef} style={{height:'70vh'}} className="card">
//       <div style={{ height: virtual.getTotalSize(), position: 'relative' }}>
//         {virtual.getVirtualItems().map(item => {
//           const c = rows[item.index];
//           return (
//             <div key={c.id} className="row" style={{
//               position:'absolute', left:0, right:0, height:item.size, transform:`translateY(${item.start}px)`,
//               borderBottom:'1px solid #e5e7eb', padding:'0 10px', background:'#fff', alignItems:'center'
//             }}>
//               <div style={{width:260}}><Link to={`/candidates/${c.id}`}><strong>{c.name}</strong></Link></div>
//               <div style={{width:300, color:'#6b7280'}}>{c.email}</div>
//               <div style={{width:160}}><span className="badge">{c.stage}</span></div>
//               <div style={{flex:1, color:'#6b7280'}}>Job: {c.jobId.slice(0,8)}…</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Link } from 'react-router-dom';

export default function CandidatesVirtualTable({ rows, rowHeight=56 }) {
  const parentRef = useRef(null);
  const virtual = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 12
  });

  return (
    <div
      ref={parentRef}
      style={{ height:'70vh', overflowY:'auto' }}
      className="card"
    >
      <div style={{ height: virtual.getTotalSize(), position: 'relative' }}>
        {virtual.getVirtualItems().map(item => {
          const c = rows[item.index];
          return (
            <div
              key={c.id}
              className="row"
              style={{
                position:'absolute',
                left:0,
                right:0,
                height:item.size,
                transform:`translateY(${item.start}px)`,
                borderBottom:'1px solid #e5e7eb',
                padding:'0 10px',
                background:'#fff',
                alignItems:'center'
              }}
            >
              <div style={{width:260}}>
                <Link to={`/candidates/${c.id}`}><strong>{c.name}</strong></Link>
              </div>
              <div style={{ width: 300 }}>
                <span className="email-text">{c.email}</span>
              </div>

              <div style={{width:160}}><span className="badge">{c.stage}</span></div>
             <div style={{flex:1}}>
                <span className="job-text">Job: {c.jobId.slice(0,8)}…</span>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
