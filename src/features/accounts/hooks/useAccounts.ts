import { useQuery } from '@tanstack/react-query';
import { getSupabaseClient } from '@/shared/lib/supabase/client';
import { useAuth } from '@/features/auth/providers/AuthProvider';
import type { Tables } from '@/shared/types/database';

type Account = Tables<'accounts'>;

export function useAccounts() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['accounts', user?.id],
    queryFn: async () => {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error('Supabase no disponible');
      if (!user) throw new Error('No autenticado');

      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_archived', false)
        .order('sort_order');

      if (error) throw error;
      return data as Account[];
    },
    enabled: !!user,
  });
}
