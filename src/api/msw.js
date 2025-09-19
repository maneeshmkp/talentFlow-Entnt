import { setupWorker } from 'msw';
import { handlers } from './handlers/index.js';
import { ensureSeeded } from '../db/seed.js';

await ensureSeeded(); // ensure DB is ready before API serves
export const worker = setupWorker(...handlers);
