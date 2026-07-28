import { Pencil, Archive, Wallet, CreditCard, PiggyBank, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/shared/lib/utils/format';

interface AccountCardProps {
  id: string;
  name: string;
  type: string;
  balance: number;
  color: string | null;
  icon: string | null;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'efectivo': return <Wallet className="w-5 h-5" />;
    case 'debito':
    case 'credito': return <CreditCard className="w-5 h-5" />;
    case 'ahorro': return <PiggyBank className="w-5 h-5" />;
    case 'inversion': return <TrendingUp className="w-5 h-5" />;
    default: return <Wallet className="w-5 h-5" />;
  }
}

export function AccountCard({ id, name, type, balance, color, onEdit, onArchive }: AccountCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-border-light dark:border-border-dark overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: color || '#64748b' }}
        >
          {getTypeIcon(type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">{name}</p>
          <p className="text-xs text-text-muted capitalize">{type}</p>
        </div>
        <p className="text-lg font-bold" style={{ color: color || '#64748b' }}>
          {formatCurrency(Number(balance))}
        </p>
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={() => onEdit(id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Editar"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onArchive(id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label="Archivar"
          >
            <Archive className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
