// src/features/transactions/components/TransactionList.tsx
export function TransactionList() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <p className="text-gray-500">Lista de transacciones con filtros, paginación y CSV export</p>
      </div>
    </div>
  );
}