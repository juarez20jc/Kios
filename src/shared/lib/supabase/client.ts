// src/shared/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

/** Cliente Supabase para el navegador (React islands) */
export const supabase = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

/** Helper para manejar errores de Supabase de forma consistente */
export function handleSupabaseError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return new Error(String((error as { message: unknown }).message));
  }
  return new Error('Error desconocido en Supabase');
}

/** Tipos de base de datos generados (ejecutar `npm run db:types` tras cambios en schema) */
export type Database = import('@/shared/types/database').Database;
export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];