/**
 * Factory de query keys tipadas — evita strings mágicos y typos.
 * Convención: queryKeys.feature.action(params)
 */
export const queryKeys = {
  // Auth
  auth: {
    session: () => ['auth', 'session'] as const,
    user: () => ['auth', 'user'] as const,
  },

  // Accounts
  accounts: {
    all: () => ['accounts'] as const,
    list: (currency?: string) => ['accounts', 'list', currency] as const,
    detail: (id: string) => ['accounts', 'detail', id] as const,
    balance: (id: string) => ['accounts', 'balance', id] as const,
  },

  // Categories
  categories: {
    all: () => ['categories'] as const,
    list: (type?: 'expense' | 'income' | 'transfer') =>
      ['categories', 'list', type] as const,
    tree: () => ['categories', 'tree'] as const,
  },

  // Transactions
  transactions: {
    all: () => ['transactions'] as const,
    list: (filters: TransactionFilters) =>
      ['transactions', 'list', filters] as const,
    detail: (id: string) => ['transactions', 'detail', id] as const,
    stats: (period: Period) => ['transactions', 'stats', period] as const,
    recurring: () => ['transactions', 'recurring'] as const,
  },

  // Budgets
  budgets: {
    all: () => ['budgets'] as const,
    list: (period: BudgetPeriod) => ['budgets', 'list', period] as const,
    detail: (id: string) => ['budgets', 'detail', id] as const,
    progress: (id: string) => ['budgets', 'progress', id] as const,
  },

  // Dashboard
  dashboard: {
    summary: (period: Period) => ['dashboard', 'summary', period] as const,
    charts: (period: Period) => ['dashboard', 'charts', period] as const,
  },
} as const;

// Tipos para filtros (definidos aquí para evitar imports circulares)
export type TransactionFilters = {
  accountId?: string;
  categoryId?: string;
  type?: 'expense' | 'income' | 'transfer';
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
};

export type Period = 'week' | 'month' | 'quarter' | 'year' | 'all';
export type BudgetPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly';