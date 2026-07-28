import { Plus, Wallet } from 'lucide-react';
import { formatCurrency } from '@/shared/lib/utils/format';
import { useAccounts } from '@/features/accounts/hooks/useAccounts';

export function BalanceCards() {
  const { data: accounts, isLoading, error } = useAccounts();

  if (isLoading) {
    return (
      <div className="px-4 space-y-3">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-shrink-0 w-36 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-gray-200 dark:bg-gray-700 mb-3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2" />
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 text-center text-sm text-red-500 py-4">
        Error al cargar cuentas
      </div>
    );
  }

  const total = (accounts || []).reduce((sum, a) => sum + Number(a.balance), 0);

  if (!accounts || accounts.length === 0) {
    return (
      <div className="px-4 space-y-3">
        <div className="mx-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-dashed border-border-light dark:border-border-dark text-center">
          <p className="text-text-muted text-sm mb-3">No tienes cuentas todavía</p>
          <a href="/Kios/accounts" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
            <Plus className="w-4 h-4" />
            Crear primera cuenta
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 space-y-3">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {accounts.map(acc => (
          <div key={acc.id} className="flex-shrink-0 w-36 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card border border-border-light dark:border-border-dark">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white mb-3"
              style={{ backgroundColor: acc.color || '#64748b' }}
            >
              <Wallet className="w-5 h-5" />
            </div>
            <p className="text-xs text-text-muted mb-1">{acc.name}</p>
            <p className="text-lg font-bold" style={{ color: acc.color || '#64748b' }}>
              {formatCurrency(Number(acc.balance))}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-4 flex items-center justify-between border border-primary-200 dark:border-primary-800">
        <p className="text-sm font-medium text-primary-700 dark:text-primary-300">Total</p>
        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{formatCurrency(total)}</p>
      </div>
    </div>
  );
}
