

import { id } from '../../utils/rand.js';

function buildQuestions(count = 12) {
  const qs = [];
  for (let i = 0; i < count; i++) {
    const t = i % 5; // rotate types
    if (t === 0) qs.push({ id: id(), type: 'short',  label: `Short text #${i+1}`, required: i % 3 === 0, max: 300 });
    if (t === 1) qs.push({ id: id(), type: 'long',   label: `Long text #${i+1}`,  required: i % 4 === 0, max: 1000 });
    if (t === 2) qs.push({ id: id(), type: 'number', label: `Years on topic #${i+1}`, required: true, range: { min: 0, max: 30 } });
    if (t === 3) qs.push({ id: id(), type: 'single', label: `Preferred env #${i+1}`, required: true, options: ['Remote','Hybrid','Onsite'] });
    if (t === 4) qs.push({ id: id(), type: 'multi',  label: `Tech stack #${i+1}`, options: ['React','Node','Python','Docker','K8s','SQL'] });
  }
  return qs;
}

export function seedAssessments(jobs) {
  // Create assessments for the first 3 jobs (at least)
  const picked = jobs.slice(0, 3);
  return picked.map(j => ({
    jobId: j.id,
    schema: {
      title: `${j.title} — Candidate Assessment`,
      questions: buildQuestions(12) // >= 10 questions
    }
  }));
}



