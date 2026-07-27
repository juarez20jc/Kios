import type { Database } from '@/shared/types/database';

type CategoryInsert = Database['public']['Tables']['categories']['Insert'];

/** Categorías por defecto — iconos de Lucide, colores Tailwind */
export const DEFAULT_CATEGORIES: Omit<CategoryInsert, 'id' | 'user_id' | 'created_at'>[] = [
  // Gastos
  { name: 'Comida', icon: 'utensils', color: '#ef4444', type: 'expense', is_default: true, sort_order: 1 },
  { name: 'Transporte', icon: 'bus', color: '#f97316', type: 'expense', is_default: true, sort_order: 2 },
  { name: 'Compras', icon: 'shopping-bag', color: '#eab308', type: 'expense', is_default: true, sort_order: 3 },
  { name: 'Entretenimiento', icon: 'film', color: '#8b5cf6', type: 'expense', is_default: true, sort_order: 4 },
  { name: 'Salud', icon: 'heart-pulse', color: '#ec4899', type: 'expense', is_default: true, sort_order: 5 },
  { name: 'Educación', icon: 'graduation-cap', color: '#06b6d4', type: 'expense', is_default: true, sort_order: 6 },
  { name: 'Vivienda', icon: 'home', color: '#84cc16', type: 'expense', is_default: true, sort_order: 7 },
  { name: 'Servicios', icon: 'wrench', color: '#64748b', type: 'expense', is_default: true, sort_order: 8 },
  { name: 'Regalos', icon: 'gift', color: '#f43f5e', type: 'expense', is_default: true, sort_order: 9 },
  { name: 'Otros', icon: 'more-horizontal', color: '#94a3b8', type: 'expense', is_default: true, sort_order: 99 },

  // Ingresos
  { name: 'Salario', icon: 'briefcase', color: '#22c55e', type: 'income', is_default: true, sort_order: 1 },
  { name: 'Freelance', icon: 'laptop', color: '#16a34a', type: 'income', is_default: true, sort_order: 2 },
  { name: 'Inversiones', icon: 'trending-up', color: '#15803d', type: 'income', is_default: true, sort_order: 3 },
  { name: 'Regalos', icon: 'gift', color: '#166534', type: 'income', is_default: true, sort_order: 4 },
  { name: 'Otros', icon: 'plus-circle', color: '#65a30d', type: 'income', is_default: true, sort_order: 99 },

  // Transferencias
  { name: 'Entre cuentas', icon: 'arrow-left-right', color: '#f59e0b', type: 'transfer', is_default: true, sort_order: 1 },
];

export const TRANSACTION_TYPES = ['expense', 'income', 'transfer'] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const ACCOUNT_TYPES = [
  'cash',
  'card',
  'bank',
  'investment',
  'crypto',
  'other',
] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];