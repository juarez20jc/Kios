import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const EXPENSE_DATA = [
  { name: 'Comida', value: 420, color: '#ef4444' },
  { name: 'Transporte', value: 180, color: '#f97316' },
  { name: 'Compras', value: 290, color: '#eab308' },
  { name: 'Entretenimiento', value: 120, color: '#8b5cf6' },
  { name: 'Salud', value: 85, color: '#ec4899' },
  { name: 'Otros', value: 135, color: '#64748b' },
];

const total = EXPENSE_DATA.reduce((s, d) => s + d.value, 0);

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
}

export function ExpenseChart() {
  return (
    <div className="mx-4 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card border border-border-light dark:border-border-dark">
      <h3 className="text-base font-semibold mb-4">Gastos por categoría</h3>
      <div className="flex flex-col items-center">
        <div className="h-48 w-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={EXPENSE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
              >
                {EXPENSE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full mt-4 space-y-2">
          {EXPENSE_DATA.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-text-secondary">{d.name}</span>
              </div>
              <span className="font-medium text-text-primary">
                {((d.value / total) * 100).toFixed(0)}% — {formatCurrency(d.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}