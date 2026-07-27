// src/features/accounts/components/BalanceCards.tsx
import { formatCurrency } from '@/shared/lib/utils/format';
import { Wallet, CreditCard, PiggyBank, TrendingUp } from 'lucide-react';

const ACCOUNTS = [
  { name: 'Efectivo', balance: 285.5, icon: Wallet, color: 'bg-green-500' },
  { name: 'Tarjeta Débito', balance: 1240.0, icon: CreditCard, color: 'bg-blue-500' },
  { name: 'Ahorros', balance: 5000, icon: PiggyBank, color: 'bg-purple-500' },
  { name: 'Inversiones', balance: 3200, icon: TrendingUp, color: 'bg-orange-500' },
];

export function BalanceCards() {
  const total = ACCOUNTS.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ACCOUNTS.map((acc) => (
        <div key={acc.name} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{acc.name}</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(acc.balance)}</p>
            </div>
            <div className={`p-3 rounded-xl ${acc.color}`}>
              <acc.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
      <div className="bg-primary-50 dark:bg-primary-900/30 rounded-2xl p-5 shadow-card border border-primary-200 dark:border-primary-800">
        <p className="text-sm text-primary-700 dark:text-primary-300">Total</p>
        <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{formatCurrency(total)}</p>
      </div>
    </div>
  );
}