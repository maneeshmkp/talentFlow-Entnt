import { range, pick, id } from '../../utils/rand.js';

const first = ['Alex','Sam','Taylor','Jordan','Morgan','Jamie','Casey','Cameron','Riley','Avery','Quinn','Drew','Skyler','Harper'];
const last = ['Lee','Kim','Patel','Singh','Garcia','Chen','Khan','Nguyen','Brown','Williams','Davis','Martinez','Lopez','Clark'];
const stages = ['applied','screen','tech','offer','hired','rejected'];

export function seedCandidates(total = 300, jobs) {
  const jobIds = jobs.map(j => j.id);
  const candidates = range(total, () => {
    const name = `${pick(first)} ${pick(last)}`;
    const email = `${name.toLowerCase().replace(/\s+/g,'.')}@example.com`;
    return {
      id: id(),
      jobId: pick(jobIds),
      stage: pick(stages),
      name,
      email
    };
  });

  const timelines = candidates.flatMap(c => {
    const hops = ['applied','screen','tech','offer','hired'];
    let till = hops.indexOf(c.stage);
    till = till === -1 ? 2 : till;
    const now = Date.now();
    return range(till + 1, i => ({
      candidateId: c.id,
      ts: now - (till - i) * 86400000,
      note: `Moved to ${hops[i]}`
    }));
  });

  return { candidates, timelines };
}
