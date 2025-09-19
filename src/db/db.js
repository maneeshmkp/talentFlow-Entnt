import Dexie from 'dexie';

export const db = new Dexie('talentflow');
db.version(1).stores({
  jobs: 'id, slug, status, order, title, tags',
  candidates: 'id, jobId, stage, name, email',
  timelines: 'candidateId',
  assessments: 'jobId',
  submissions: 'id, jobId, candidateId', // assessment responses
});
