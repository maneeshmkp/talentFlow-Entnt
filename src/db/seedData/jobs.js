import { range, id } from '../../utils/rand.js';
import slugify from '../../utils/slugify.js';

export function seedJobs(count = 14) {
  const titles = [
    'Frontend Engineer', 'Backend Engineer', 'Fullstack Engineer', 'QA Engineer',
    'Mobile Developer', 'Product Manager', 'Data Scientist', 'ML Engineer',
    'DevOps Engineer', 'Designer', 'Support Engineer', 'Security Engineer',
    'Technical Writer', 'Solutions Architect'
  ];
  const tagsPool = ['remote','hybrid','onsite','junior','mid','senior','urgent'];

  return range(count, i => {
    const title = titles[i % titles.length] + ' ' + (i+1);
    const status = i % 7 === 0 ? 'archived' : 'active';
    const tags = [tagsPool[i % tagsPool.length], tagsPool[(i+3) % tagsPool.length]];
    return {
      id: id(),
      title,
      slug: slugify(title),
      status,
      order: i + 1,
      tags
    };
  });
}

