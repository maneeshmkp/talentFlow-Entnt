import { createBrowserRouter } from 'react-router-dom';
import JobsPage from '../features/jobs/JobsPage.jsx';
import CandidatesPage from '../features/candidates/CandidatesPage.jsx';
import CandidateProfile from '../features/candidates/CandidateProfile.jsx';
import AssessmentBuilder from '../features/assessments/AssessmentBuilder.jsx';
import AssessmentRuntime from '../features/assessments/AssessmentRuntime.jsx';

export const router = createBrowserRouter([
  { path: '/', element: <JobsPage/> },
  { path: '/jobs', element: <JobsPage/> },
  { path: '/jobs/:jobId', element: <JobsPage/> }, // deep link
  { path: '/candidates', element: <CandidatesPage/> },
  { path: '/candidates/:id', element: <CandidateProfile/> },
  { path: '/assessments/:jobId/builder', element: <AssessmentBuilder/> },
  { path: '/assessments/:jobId', element: <AssessmentRuntime/> },
]);
