// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useCandidate, useTimeline } from './useCandidatesApi.js';
// import Spinner from '../../components/Spinner.jsx';
// import ErrorBanner from '../../components/ErrorBanner.jsx';
// import Notes from './Notes.jsx';

// export default function CandidateProfile() {
//   const { id } = useParams();
//   const { data: cand, isLoading, error } = useCandidate(id);
//   const tl = useTimeline(id);

//   if (isLoading) return <Spinner/>;
//   if (error) return <ErrorBanner error={error}/>;
//   if (!cand) return <div className="card">Not found</div>;

//   return (
//     <div className="columns">
//       <div className="card">
//         <h2 style={{marginTop:0}}>{cand.name}</h2>
//         <div style={{color:'#6b7280'}}>{cand.email}</div>
//         <div style={{marginTop:8}}><span className="badge">{cand.stage}</span></div>
//         <hr className="sep"/>
//         <h3>Timeline</h3>
//         {tl.isLoading ? <Spinner small/> :
//           (tl.data?.length ? (
//             <ul>
//               {tl.data.map(item => (
//                 <li key={item.ts}>{new Date(item.ts).toLocaleString()} — {item.note}</li>
//               ))}
//             </ul>
//           ) : <div style={{color:'#6b7280'}}>No timeline yet</div>)
//         }
//         <hr className="sep"/>
//         <Link to={`/assessments/${cand.jobId}`} className="btn secondary">Open Assessment</Link>
//       </div>

//       <Notes />
//     </div>
//   );
// }



// CandidateProfile.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCandidate, useTimeline } from './useCandidatesApi.js';
import Spinner from '../../components/Spinner.jsx';
import ErrorBanner from '../../components/ErrorBanner.jsx';
import Notes from './Notes.jsx';

export default function CandidateProfile() {
  const { id } = useParams();
  const { data: cand, isLoading, error } = useCandidate(id);
  const tl = useTimeline(id);

  if (isLoading) return <Spinner/>;
  if (error) return <ErrorBanner error={error}/>;
  if (!cand) return <div className="card">Not found</div>;

  const initials = cand.name?.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();

  return (
    <div className="columns profile">
      {/* Left column */}
      <div className="card profile-card">
        <div className="profile-header">
          <div className="avatar" aria-hidden="true">{initials || '?'}</div>
          <div className="min-shrink">
            <h2 className="profile-name">{cand.name}</h2>
            <a href={`mailto:${cand.email}`} className="profile-email" title={cand.email}>
              {cand.email}
            </a>
          </div>
        </div>

        <div className="profile-meta">
          <span className={`badge stage-badge`}>{cand.stage}</span>
          <Link to={`/assessments/${cand.jobId}`} className="btn soft">Open assessment</Link>
        </div>

        <hr className="sep"/>

        <h3 className="section-title">Timeline</h3>
        {tl.isLoading ? (
          <Spinner small/>
        ) : tl.data?.length ? (
          <ul className="timeline">
            {tl.data.map(item => (
              <li key={item.ts} className="timeline-item">
                <time className="tstamp">
                  {new Date(item.ts).toLocaleString()}
                </time>
                <span className="note">{item.note}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="muted">No timeline yet</div>
        )}
      </div>

      {/* Right column */}
      <div className="card profile-notes">
        <Notes />
      </div>
    </div>
  );
}
