#!/usr/bin/env tsx
// scripts/db-types.ts
// Genera tipos TypeScript desde esquema Supabase

import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { config } from 'dotenv';
config({ path: '.env.local' });

const projectRef = process.env.SUPABASE_PROJECT_REF;
const dbUrl = process.env.SUPABASE_DB_URL;

if (!projectRef && !dbUrl) {
  console.error('❌ Define SUPABASE_PROJECT_REF o SUPABASE_DB_URL en .env.local');
  process.exit(1);
}

const args = ['gen', 'types', 'typescript'];
if (projectRef) args.push('--linked');
if (dbUrl) args.push('--db-url', dbUrl);

console.log('🔧 Generando tipos...');
const result = spawnSync('npx', ['supabase', ...args], {
  stdio: ['ignore', 'pipe', 'inherit'],
  shell: true,
});

if (result.status !== 0 || !result.stdout) {
  console.error('❌ Error generando tipos');
  process.exit(1);
}

// Sobrescribe src/shared/types/database.ts
const outputPath = 'src/shared/types/database.ts';
writeFileSync(outputPath, result.stdout);
console.log(`✅ Tipos escritos en ${outputPath}`);