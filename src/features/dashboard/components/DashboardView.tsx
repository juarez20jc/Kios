import { BalanceCards } from './BalanceCards';
import { ExpenseChart } from './ExpenseChart';
import { RecentTransactions } from './RecentTransactions';
import { DashboardSummary } from './DashboardSummary';

export function DashboardView() {
  return (
    <div className="px-0 py-6 space-y-6 max-w-lg mx-auto">
      <BalanceCards />
      <ExpenseChart />
      <DashboardSummary />
      <RecentTransactions />
    </div>
  );
}