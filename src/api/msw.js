import { setupWorker } from 'msw/browser';
import { handlers } from './handlers/index.js';
import { ensureSeeded } from '../db/seed.js';

await ensureSeeded();
export const worker = setupWorker(...handlers);
