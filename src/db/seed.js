import { db } from './db.js';
import { seedJobs } from './seedData/jobs.js';
import { seedCandidates } from './seedData/candidates.js';
import { seedAssessments } from './seedData/assessments.js';

export async function ensureSeeded() {
  const flag = localStorage.getItem('tf_seeded_v1');
  if (flag) return;

  await db.transaction('rw', db.jobs, db.candidates, db.assessments, db.timelines, async () => {
    const jobs = seedJobs(25); // mixed active/archived, tags, order
    await db.jobs.bulkAdd(jobs);

    const { candidates, timelines } = seedCandidates(1000, jobs);
    await db.candidates.bulkAdd(candidates);
    await db.timelines.bulkAdd(timelines);

    const assessments = seedAssessments(jobs); // ≥3 assessments, 10+ Qs each
    await db.assessments.bulkAdd(assessments);
  });

  localStorage.setItem('tf_seeded_v1', '1');
}
