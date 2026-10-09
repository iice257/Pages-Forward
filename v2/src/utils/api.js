// The API client is chosen at build time. The landing site builds v2 with VITE_STATIC=1, which swaps the
// Express + lowdb server for a read-only demo backed by the seed data and localStorage.
import { api as live } from './api.live.js';
import { api as demo } from './api.static.js';

export const api = import.meta.env.VITE_STATIC ? demo : live;
