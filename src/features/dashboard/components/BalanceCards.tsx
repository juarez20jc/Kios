import { formatCurrency } from '@/shared/lib/utils/format';
import { Wallet, CreditCard, PiggyBank, TrendingUp } from 'lucide-react';

const ACCOUNTS = [
  { title: 'Efectivo', balance: 285.5, icon: <Wallet className="w-5 h-5" />, color: 'bg-green-500', textColor: 'text-green-600 dark:text-green-400' },
  { title: 'Tarjeta Débito', balance: 1240.0, icon: <CreditCard className="w-5 h-5" />, color: 'bg-blue-500', textColor: 'text-blue-600 dark:text-blue-400' },
  { title: 'Ahorros', balance: 5000, icon: <PiggyBank className="w-5 h-5" />, color: 'bg-purple-500', textColor: 'text-purple-600 dark:text-purple-400' },
  { title: 'Inversiones', balance: 3200, icon: <TrendingUp className="w-5 h-5" />, color: 'bg-orange-500', textColor: 'text-orange-600 dark:text-orange-400' },
];

export function BalanceCards() {
  const total = ACCOUNTS.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="px-4 space-y-3">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {ACCOUNTS.map((acc) => (
          <div key={acc.title} className="flex-shrink-0 w-36 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card border border-border-light dark:border-border-dark">
            <div className={`w-9 h-9 rounded-xl ${acc.color} flex items-center justify-center text-white mb-3`}>
              {acc.icon}
            </div>
            <p className="text-xs text-text-muted mb-1">{acc.title}</p>
            <p className={`text-lg font-bold ${acc.textColor}`}>{formatCurrency(acc.balance)}</p>
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