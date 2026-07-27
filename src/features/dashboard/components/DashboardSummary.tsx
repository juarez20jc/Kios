// src/features/dashboard/components/DashboardSummary.tsx
export function DashboardSummary() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card">
      <h3 className="text-lg font-semibold mb-4">Resumen del mes</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Ingresos</span>
          <span className="font-semibold text-green-600">+€2,450.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Gastos</span>
          <span className="font-semibold text-red-600">-€1,230.50</span>
        </div>
        <div className="flex justify-between border-t pt-3">
          <span className="font-medium">Balance</span>
          <span className="font-bold text-primary-600">+€1,219.50</span>
        </div>
      </div>
    </div>
  );
}