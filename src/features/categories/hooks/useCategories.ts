import { useQuery } from '@tanstack/react-query';
import { getSupabaseClient } from '@/shared/lib/supabase/client';
import { useAuth } from '@/features/auth/providers/AuthProvider';
import type { Tables } from '@/shared/types/database';

type Category = Tables<'categories'>;

const DEFAULT_CATEGORIES: Array<{
  name: string; type: string; icon: string; color: string; is_default: boolean; sort_order: number;
}> = [
  { name: 'Salario', type: 'income', icon: '💰', color: '#22c55e', is_default: true, sort_order: 1 },
  { name: 'Freelance', type: 'income', icon: '💻', color: '#16a34a', is_default: true, sort_order: 2 },
  { name: 'Comida', type: 'expense', icon: '🍕', color: '#ef4444', is_default: true, sort_order: 1 },
  { name: 'Transporte', type: 'expense', icon: '🚗', color: '#f97316', is_default: true, sort_order: 2 },
  { name: 'Compras', type: 'expense', icon: '🛒', color: '#eab308', is_default: true, sort_order: 3 },
  { name: 'Entretenimiento', type: 'expense', icon: '🎬', color: '#8b5cf6', is_default: true, sort_order: 4 },
  { name: 'Salud', type: 'expense', icon: '💊', color: '#ec4899', is_default: true, sort_order: 5 },
  { name: 'Hogar', type: 'expense', icon: '🏠', color: '#6366f1', is_default: true, sort_order: 6 },
  { name: 'Educación', type: 'expense', icon: '📚', color: '#14b8a6', is_default: true, sort_order: 7 },
  { name: 'Otros', type: 'expense', icon: '📦', color: '#64748b', is_default: true, sort_order: 8 },
];

export function useCategories() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['categories', user?.id],
    queryFn: async () => {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error('Supabase no disponible');
      if (!user) throw new Error('No autenticado');

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('sort_order');

      if (error) throw error;

      if (data.length === 0) {
        const { data: seeded, error: seedError } = await supabase
          .from('categories')
          .insert(DEFAULT_CATEGORIES.map(c => ({ ...c, user_id: user.id })))
          .select()
          .order('sort_order');

        if (seedError) throw seedError;
        return seeded as Category[];
      }

      return data as Category[];
    },
    enabled: !!user,
  });
}
