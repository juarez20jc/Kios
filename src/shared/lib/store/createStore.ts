import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * Factory para crear stores Zustand con:
 * - Immer: mutaciones inmutables simples (state.arr.push())
 * - Persist: localStorage automático
 * - DevTools: visible en Redux DevTools
 */
export function createStore<T extends object>(
  name: string,
  initializer: (set: any, get: any, api: any) => T
) {
  return create<T>()(
    immer(
      persist(initializer, {
        name: `kios-${name}`,
        storage: createJSONStorage(() => localStorage),
        version: 1,
        partialize: (state) => {
          // Excluye funciones y estado transitorio
          const { ...rest } = state;
          return rest;
        },
      })
    )
  );
}