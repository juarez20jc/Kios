import { useQuery } from '@tanstack/react-query';
import { getSupabaseClient } from '@/shared/lib/supabase/client';
import { useAuth } from '@/features/auth/providers/AuthProvider';

export function useRecentTransactions(limit = 5) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['recent-transactions', user?.id, limit],
    queryFn: async () => {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error('Supabase no disponible');
      if (!user) throw new Error('No autenticado');

      const { data, error } = await supabase
        .from('transactions')
        .select('*, categories(name, icon, color)')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useMonthSummary(year: number, month: number) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['month-summary', user?.id, year, month],
    queryFn: async () => {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error('Supabase no disponible');
      if (!user) throw new Error('No autenticado');

      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

      const { data, error } = await supabase
        .from('transactions')
        .select('amount, type, categories(name, color)')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lt('date', endDate);

      if (error) throw error;

      const transactions: Array<{ amount: number; type: string; categories: { name: string; color: string } | null }> = data;

      const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
      const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(Number(t.amount)), 0);
      const balance = income - expenses;

      const categoryMap = new Map<string, { name: string; value: number; color: string }>();
      transactions.filter(t => t.type === 'expense').forEach(t => {
        const catName = t.categories?.name || 'Sin categoría';
        const catColor = t.categories?.color || '#64748b';
        const current = categoryMap.get(catName) || { name: catName, value: 0, color: catColor };
        current.value += Math.abs(Number(t.amount));
        categoryMap.set(catName, current);
      });

      return {
        income,
        expenses,
        balance,
        expensesByCategory: Array.from(categoryMap.values()).sort((a, b) => b.value - a.value),
      };
    },
    enabled: !!user,
  });
}
