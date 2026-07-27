// src/components/islands/TransactionsIsland.tsx
import { TransactionList } from '@/features/transactions/components/TransactionList';

export default function TransactionsIsland() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Movimientos</h2>
        <span className="text-sm text-gray-500">Lista completa con filtros</span>
      </div>
      <TransactionList />
    </div>
  );
}