// src/features/dashboard/components/BalanceCards.tsx
import { formatCurrency } from '@/shared/lib/utils/format';
import { Wallet, CreditCard, PiggyBank, TrendingUp } from 'lucide-react';

interface BalanceCardProps {
  title: string;
  balance: number;
  icon: React.ReactNode;
  color: string;
}

export function BalanceCard({ title, balance, icon, color }: BalanceCardProps) {
  return (
    <div className={`rounded-2xl p-5 shadow-card ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="mt-2 text-2xl font-bold">{formatCurrency(balance)}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/50 dark:bg-black/20">{icon}</div>
      </div>
    </div>
  );
}

const ACCOUNTS = [
  { title: 'Efectivo', balance: 285.5, icon: <Wallet className="w-6 h-6" />, color: 'bg-green-500' },
  { title: 'Tarjeta Débito', balance: 1240.0, icon: <CreditCard className="w-6 h-6" />, color: 'bg-blue-500' },
  { title: 'Ahorros', balance: 5000, icon: <PiggyBank className="w-6 h-6" />, color: 'bg-purple-500' },
  { title: 'Inversiones', balance: 3200, icon: <TrendingUp className="w-6 h-6" />, color: 'bg-orange-500' },
];

export function BalanceCards() {
  const total = ACCOUNTS.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ACCOUNTS.map((acc) => (
        <BalanceCard key={acc.title} {...acc} />
      ))}
      <div className="bg-primary-50 dark:bg-primary-900/30 rounded-2xl p-5 shadow-card border border-primary-200 dark:border-primary-800">
        <p className="text-sm text-primary-700 dark:text-primary-300">Total</p>
        <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{formatCurrency(total)}</p>
      </div>
    </div>
  );
}