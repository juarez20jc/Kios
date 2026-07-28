import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useMonthSummary } from '@/features/transactions/hooks/useTransactions';
import { formatCurrency } from '@/shared/lib/utils/format';

export function DashboardSummary() {
  const now = new Date();
  const { data, isLoading } = useMonthSummary(now.getFullYear(), now.getMonth() + 1);

  if (isLoading) {
    return (
      <div className="mx-4 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-border-light dark:border-border-dark animate-pulse">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const income = data?.income ?? 0;
  const expenses = data?.expenses ?? 0;
  const balance = data?.balance ?? 0;

  return (
    <div className="mx-4 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-border-light dark:border-border-dark">
      <p className="text-base font-semibold mb-4">Resumen del mes</p>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm text-text-secondary">Ingresos</span>
          </div>
          <span className="font-semibold text-green-600">+{formatCurrency(income)}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm text-text-secondary">Gastos</span>
          </div>
          <span className="font-semibold text-red-600">-{formatCurrency(expenses)}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-900/10 rounded-xl border border-primary-200 dark:border-primary-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-sm font-medium text-text-primary">Balance</span>
          </div>
          <span className="font-bold text-primary-600 dark:text-primary-400">
            {balance >= 0 ? '+' : ''}{formatCurrency(balance)}
          </span>
        </div>
      </div>
    </div>
  );
}
