// src/features/dashboard/components/RecentTransactions.tsx
import { formatCurrency } from '@/shared/lib/utils/format';
import { formatDateShort } from '@/shared/lib/utils/format';

const RECENT_TXNS = [
  { id: '1', description: 'Supermercado', amount: -85.5, category: 'Comida', date: '2024-01-15', icon: '🍕' },
  { id: '2', description: 'Uber', amount: -12.3, category: 'Transporte', date: '2024-01-14', icon: '🚗' },
  { id: '3', description: 'Salario', amount: 2450, category: 'Salario', date: '2024-01-10', icon: '💰' },
  { id: '4', description: 'Netflix', amount: -15.99, category: 'Entretenimiento', date: '2024-01-08', icon: '🎬' },
  { id: '5', description: 'Farmacia', amount: -28.4, category: 'Salud', date: '2024-01-07', icon: '💊' },
];

export function RecentTransactions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Últimos movimientos</h3>
        <a href="/transactions" className="text-sm text-primary-600 hover:underline">Ver todos</a>
      </div>
      <div className="space-y-3">
        {RECENT_TXNS.map((txn) => (
          <div key={txn.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{txn.icon}</span>
              <div>
                <p className="font-medium">{txn.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {txn.category} · {formatDateShort(txn.date)}
                </p>
              </div>
            </div>
            <span className={txn.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
              {txn.amount >= 0 ? '+' : ''}{formatCurrency(txn.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}