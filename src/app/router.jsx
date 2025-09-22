// import React from 'react';
// import { createBrowserRouter, Link, Outlet, NavLink } from 'react-router-dom';
// import JobsPage from '../features/jobs/JobsPage.jsx';
// import CandidatesPage from '../features/candidates/CandidatesPage.jsx';
// import CandidateProfile from '../features/candidates/CandidateProfile.jsx';
// import AssessmentBuilder from '../features/assessments/AssessmentBuilder.jsx';
// import AssessmentRuntime from '../features/assessments/AssessmentRuntime.jsx';


// function Shell() {
//   return (
//     <div className="container">
//       <header className="row" style={{justifyContent:'space-between', marginBottom: 16}}>
//         <Link to="/" className="row" style={{gap:8, textDecoration:'none'}}>
//           <strong style={{fontSize:20}}>JobFusion</strong>
//           <span className="badge">mkp</span>
//         </Link>
//         <nav className="row" style={{gap:10}}>
//           <NavLink to="/jobs" className="btn secondary">Jobs</NavLink>
//           <NavLink to="/candidates" className="btn secondary">Candidates</NavLink>
//         </nav>
//       </header>
//       <Outlet/>
//     </div>
//   );
// }

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Shell/>,
//     children: [
//       { index: true, element: <JobsPage/> },
//       { path: 'jobs', element: <JobsPage/> },
//       { path: 'jobs/:jobId', element: <JobsPage/> },
//       { path: 'candidates', element: <CandidatesPage/> },
//       { path: 'candidates/:id', element: <CandidateProfile/> },
//       { path: 'assessments/:jobId/builder', element: <AssessmentBuilder/> },
//       { path: 'assessments/:jobId', element: <AssessmentRuntime/> },
//     ]
//   }
// ]);




import React, { useState, useEffect } from 'react';
import { createBrowserRouter, Link, Outlet, NavLink } from 'react-router-dom';
import JobsPage from '../features/jobs/JobsPage.jsx';
import CandidatesPage from '../features/candidates/CandidatesPage.jsx';
import CandidateProfile from '../features/candidates/CandidateProfile.jsx';
import AssessmentBuilder from '../features/assessments/AssessmentBuilder.jsx';
import AssessmentRuntime from '../features/assessments/AssessmentRuntime.jsx';

function Shell() {
  const [darkMode, setDarkMode] = useState(() => {
    // load saved preference if any
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="container">
      <header className="row" style={{ justifyContent:'space-between', marginBottom: 16 }}>
        <Link to="/" className="row" style={{ gap:8, textDecoration:'none' }}>
          <strong style={{ fontSize:20 }}>JobFusion</strong>
          <span className="badge">mkp</span>
        </Link>

        <nav className="row" style={{ gap:10 }}>
          <NavLink to="/jobs" className="btn secondary">Jobs</NavLink>
          <NavLink to="/candidates" className="btn secondary">Candidates</NavLink>

          {/* 🌙 toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn secondary"
            style={{ cursor: 'pointer' }}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>
      </header>
      <Outlet/>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell/>,
    children: [
      { index: true, element: <JobsPage/> },
      { path: 'jobs', element: <JobsPage/> },
      { path: 'jobs/:jobId', element: <JobsPage/> },
      { path: 'candidates', element: <CandidatesPage/> },
      { path: 'candidates/:id', element: <CandidateProfile/> },
      { path: 'assessments/:jobId/builder', element: <AssessmentBuilder/> },
      { path: 'assessments/:jobId', element: <AssessmentRuntime/> },
    ]
  }
]);
