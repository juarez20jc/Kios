#!/usr/bin/env tsx
// scripts/db-seed.ts
// Inserta datos semilla (categorías por defecto)

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync } from 'node:fs';
config({ path: '.env.local' });

const url = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('❌ Define SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function seed() {
  console.log('🌱 Insertando categorías por defecto...');

  const seedSql = readFileSync('supabase/seed.sql', 'utf-8');
  const { error } = await supabase.rpc('exec_sql', { sql: seedSql });

  if (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }

  console.log('✅ Seed completado');
}

seed();