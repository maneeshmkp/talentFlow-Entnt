import { db } from './db.js';
import { seedJobs } from './seedData/jobs.js';
import { seedCandidates } from './seedData/candidates.js';
import { seedAssessments } from './seedData/assessments.js';

export async function ensureSeeded() {
  const flag = localStorage.getItem('tf_seeded_v2');
  if (flag) return;

  await db.transaction('rw', db.jobs, db.candidates, db.timelines, db.assessments, async () => {
    const jobs = seedJobs(25);        
    await db.jobs.bulkPut(jobs);

    const { candidates, timelines } = seedCandidates(1000, jobs);
    await db.candidates.bulkPut(candidates);
    await db.timelines.bulkPut(timelines);

    const assessments = seedAssessments(jobs);
    await db.assessments.bulkPut(assessments);
  });

  localStorage.setItem('tf_seeded_v2', '2');
}

