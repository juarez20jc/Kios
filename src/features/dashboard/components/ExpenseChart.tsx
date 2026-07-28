import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useMonthSummary } from '@/features/transactions/hooks/useTransactions';
import { formatCurrency } from '@/shared/lib/utils/format';

export function ExpenseChart() {
  const now = new Date();
  const { data, isLoading } = useMonthSummary(now.getFullYear(), now.getMonth() + 1);

  if (isLoading) {
    return (
      <div className="mx-4 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-border-light dark:border-border-dark animate-pulse">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4" />
        <div className="h-48 w-48 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4" />
      </div>
    );
  }

  const expenses = data?.expensesByCategory || [];

  if (expenses.length === 0) {
    return (
      <div className="mx-4 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-border-light dark:border-border-dark text-center">
        <p className="text-base font-semibold mb-2">Gastos por categoría</p>
        <p className="text-sm text-text-muted">Sin gastos este mes</p>
      </div>
    );
  }

  return (
    <div className="mx-4 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-border-light dark:border-border-dark">
      <p className="text-base font-semibold mb-4">Gastos por categoría</p>
      <div className="flex flex-col items-center">
        <div className="h-48 w-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenses}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
              >
                {expenses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full mt-4 space-y-2">
          {expenses.map(d => (
            <div key={d.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-text-secondary">{d.name}</span>
              </div>
              <span className="font-medium text-text-primary">{formatCurrency(d.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
