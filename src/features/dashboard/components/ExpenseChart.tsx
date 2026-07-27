// src/features/dashboard/components/ExpenseChart.tsx
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cn } from '@/shared/lib/utils/cn';

const EXPENSE_DATA = [
  { name: 'Comida', value: 420, color: '#ef4444' },
  { name: 'Transporte', value: 180, color: '#f97316' },
  { name: 'Compras', value: 290, color: '#eab308' },
  { name: 'Entretenimiento', value: 120, color: '#8b5cf6' },
  { name: 'Salud', value: 85, color: '#ec4899' },
  { name: 'Otros', value: 135, color: '#64748b' },
];

interface ExpenseChartProps {
  className?: string;
}

export function ExpenseChart({ className }: ExpenseChartProps) {
  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card h-full', className)}>
      <h3 className="text-lg font-semibold mb-4">Gastos por categoría</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={EXPENSE_DATA}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {EXPENSE_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), '']}
              labelFormatter={(name) => name}
              contentStyle={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
              }}
            />
            <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" iconSize={10} wrapperStyle={{ paddingRight: 20 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
}