// src/shared/lib/supabase/client.ts
// Cliente Supabase SOLO para navegador (no se ejecuta durante build)

import { createBrowserClient } from '@supabase/ssr';

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

/** Obtiene cliente Supabase - SOLO se ejecuta en navegador */
export function getSupabaseClient() {
  if (typeof window === 'undefined') {
    // Durante build/SSR: devuelve null o mock
    return null as any;
  }
  
  if (!browserClient) {
    browserClient = createBrowserClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return browserClient;
}

/** Helper para manejar errores de Supabase de forma consistente */
export function handleSupabaseError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return new Error(String((error as { message: unknown }).message));
  }
  return new Error('Error desconocido en Supabase');
}

/** Tipos de base de datos generados */
export type Database = import('@/shared/types/database').Database;
export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

// Export para compatibilidad (usa getSupabaseClient() en su lugar)
export const supabase = {
  get auth() { return getSupabaseClient()?.auth; },
  get from() { return getSupabaseClient()?.from; },
  get rpc() { return getSupabaseClient()?.rpc; },
  get storage() { return getSupabaseClient()?.storage; },
  get realtime() { return getSupabaseClient()?.realtime; },
  get functions() { return getSupabaseClient()?.functions; },
  get channel() { return getSupabaseClient()?.channel; },
  get removeChannel() { return getSupabaseClient()?.removeChannel; },
  get removeAllChannels() { return getSupabaseClient()?.removeAllChannels; },
};