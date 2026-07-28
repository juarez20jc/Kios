import { ArrowRight } from 'lucide-react';
import { formatCurrency, formatDateShort } from '@/shared/lib/utils/format';
import { useRecentTransactions } from '@/features/transactions/hooks/useTransactions';

export function RecentTransactions() {
  const { data: transactions, isLoading } = useRecentTransactions(5);

  return (
    <div className="mx-4 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-border-light dark:border-border-dark">
      <div className="flex items-center justify-between mb-4">
        <p className="text-base font-semibold">Últimos movimientos</p>
        <a href="/Kios/transactions" className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1">
          Ver todos <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {isLoading ? (
        <div className="space-y-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between py-3 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                </div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            </div>
          ))}
        </div>
      ) : !transactions || transactions.length === 0 ? (
        <p className="text-center text-sm text-text-muted py-6">Sin movimientos este mes</p>
      ) : (
        <div className="space-y-1">
          {transactions.map((txn: any) => (
            <div key={txn.id} className="flex items-center justify-between py-3 border-b border-border-light dark:border-border-dark last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-xl">{txn.categories?.icon || '📄'}</span>
                <div>
                  <p className="text-sm font-medium text-text-primary">{txn.description || txn.categories?.name || 'Sin descripción'}</p>
                  <p className="text-xs text-text-muted">
                    {txn.categories?.name || 'General'} · {formatDateShort(txn.date)}
                  </p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${txn.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {txn.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(Number(txn.amount)))}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
