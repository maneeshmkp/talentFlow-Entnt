import { id } from '../../utils/rand.js';

export function seedAssessments(jobs) {
  return jobs.slice(0, 3).map(j => ({
    jobId: j.id,
    schema: {
      title: `${j.title} — Candidate Assessment`,
      questions: [
        { id: id(), type: 'short', label: 'Tell us about yourself', required: true, max: 300 },
        { id: id(), type: 'number', label: 'Years of experience', required: true, range: { min: 0, max: 30 } },
        { id: id(), type: 'single', label: 'Comfort with remote work?', required: true, options: ['Yes','No'] },
        { id: id(), type: 'multi', label: 'Tech you know', options: ['React','Node','Python','Docker'] },
        { id: id(), type: 'long', label: 'Most challenging project?', required: false, max: 1000 }
      ]
    }
  }));
}
