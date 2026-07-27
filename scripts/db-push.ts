#!/usr/bin/env tsx
// scripts/db-push.ts
// Aplica migraciones a Supabase local o remoto

import { spawnSync } from 'node:child_process';
import { config } from 'dotenv';
config({ path: '.env.local' });

const projectRef = process.env.SUPABASE_PROJECT_REF;
const dbUrl = process.env.SUPABASE_DB_URL;

if (!projectRef && !dbUrl) {
  console.error('❌ Define SUPABASE_PROJECT_REF o SUPABASE_DB_URL en .env.local');
  process.exit(1);
}

const args = ['db', 'push'];
if (projectRef) args.push('--linked');
if (dbUrl) args.push('--db-url', dbUrl);

console.log('📦 Ejecutando: npx supabase', args.join(' '));
const result = spawnSync('npx', ['supabase', ...args], {
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status ?? 1);