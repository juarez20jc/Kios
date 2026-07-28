import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

interface AccountFormData {
  name: string;
  type: string;
  color: string;
  balance: string;
}

interface AccountFormProps {
  open: boolean;
  editingId: string | null;
  initialData: AccountFormData | null;
  onClose: () => void;
  onSave: (data: AccountFormData) => void;
  saving: boolean;
}

const ACCOUNT_TYPES = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'debito', label: 'Tarjeta Débito' },
  { value: 'credito', label: 'Tarjeta Crédito' },
  { value: 'ahorro', label: 'Ahorros' },
  { value: 'inversion', label: 'Inversiones' },
];

const COLORS = [
  '#22c55e', '#16a34a', '#3b82f6', '#2563eb', '#8b5cf6',
  '#7c3aed', '#f59e0b', '#f97316', '#ef4444', '#ec4899',
  '#14b8a6', '#64748b',
];

export function AccountForm({ open, editingId, initialData, onClose, onSave, saving }: AccountFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('efectivo');
  const [color, setColor] = useState(COLORS[0]);
  const [balance, setBalance] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
      setColor(initialData.color);
      setBalance(initialData.balance);
    } else {
      setName('');
      setType('efectivo');
      setColor(COLORS[0]);
      setBalance('');
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), type, color, balance: balance || '0' });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-t-3xl p-6 pb-8 animate-slide-up shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">
            {editingId ? 'Editar cuenta' : 'Nueva cuenta'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="acc-name">Nombre</Label>
            <Input
              id="acc-name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ej. Mi efectivo"
              required
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo</Label>
            <div className="grid grid-cols-2 gap-2">
              {ACCOUNT_TYPES.map(t => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  disabled={saving}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-colors ${
                    type === t.value
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white dark:bg-gray-800 text-text-secondary border-border-light dark:border-border-dark hover:border-primary-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  disabled={saving}
                  className={`w-8 h-8 rounded-full transition-all ${
                    color === c ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-primary-500 scale-110' : ''
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="acc-balance">Saldo inicial</Label>
            <Input
              id="acc-balance"
              type="number"
              step="0.01"
              value={balance}
              onChange={e => setBalance(e.target.value)}
              placeholder="0.00"
              disabled={saving}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={saving}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={saving || !name.trim()}>
              {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear cuenta'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
