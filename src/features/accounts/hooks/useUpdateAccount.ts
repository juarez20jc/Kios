import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSupabaseClient } from '@/shared/lib/supabase/client';
import { useAuth } from '@/features/auth/providers/AuthProvider';
import type { Tables } from '@/shared/types/database';

type AccountUpdate = Tables<'accounts'>;

export function useUpdateAccount() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<AccountUpdate>) => {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error('Supabase no disponible');
      if (!user) throw new Error('No autenticado');

      const { data, error } = await supabase
        .from('accounts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts', user?.id] });
    },
  });
}
