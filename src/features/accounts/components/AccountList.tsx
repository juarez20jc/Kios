import { Plus } from 'lucide-react';
import { AccountCard } from './AccountCard';
import { formatCurrency } from '@/shared/lib/utils/format';
import type { Tables } from '@/shared/types/database';

type Account = Tables<'accounts'>;

interface AccountListProps {
  accounts: Account[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
}

export function AccountList({ accounts, total, isLoading, error, onAdd, onEdit, onArchive }: AccountListProps) {
  if (isLoading) {
    return (
      <div className="px-4 py-6 space-y-3 max-w-lg mx-auto">
        <div className="h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-card animate-pulse border border-border-light dark:border-border-dark" />
        <div className="h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-card animate-pulse border border-border-light dark:border-border-dark" />
        <div className="h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-card animate-pulse border border-border-light dark:border-border-dark" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 max-w-lg mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-5 text-center text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
          Error al cargar cuentas. Intenta de nuevo.
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-3 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-text-primary">Cuentas</h1>
      </div>

      {accounts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-card border border-dashed border-border-light dark:border-border-dark text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <Plus className="w-7 h-7 text-primary-600 dark:text-primary-400" />
          </div>
          <p className="text-text-primary font-medium mb-1">No tienes cuentas</p>
          <p className="text-sm text-text-muted mb-5">Crea tu primera cuenta para empezar</p>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Crear cuenta
          </button>
        </div>
      ) : (
        <>
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-4 flex items-center justify-between border border-primary-200 dark:border-primary-800">
            <p className="text-sm font-medium text-primary-700 dark:text-primary-300">Total</p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{formatCurrency(total)}</p>
          </div>

          {accounts.map(acc => (
            <AccountCard
              key={acc.id}
              id={acc.id}
              name={acc.name}
              type={acc.type}
              balance={Number(acc.balance)}
              color={acc.color}
              icon={acc.icon}
              onEdit={onEdit}
              onArchive={onArchive}
            />
          ))}
        </>
      )}

      {accounts.length > 0 && (
        <button
          onClick={onAdd}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors flex items-center justify-center z-40"
          aria-label="Añadir cuenta"
        >
          <Plus className="w-7 h-7" />
        </button>
      )}
    </div>
  );
}
