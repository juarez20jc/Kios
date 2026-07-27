// src/features/dashboard/components/DashboardView.tsx
import { BalanceCards } from './BalanceCards';
import { ExpenseChart } from './ExpenseChart';
import { RecentTransactions } from './RecentTransactions';
import { DashboardSummary } from './DashboardSummary';

export function DashboardView() {
  return (
    <div className="p-4 space-y-6">
      <BalanceCards />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ExpenseChart />
        <DashboardSummary />
      </div>
      <RecentTransactions />
    </div>
  );
}