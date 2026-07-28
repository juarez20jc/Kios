import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSupabaseClient } from '@/shared/lib/supabase/client';
import { useAuth } from '@/features/auth/providers/AuthProvider';

export interface CreateAccountInput {
  name: string;
  type: string;
  color: string;
  currency?: string;
  icon?: string;
  balance?: number;
  sort_order?: number;
}

export function useCreateAccount() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateAccountInput) => {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error('Supabase no disponible');
      if (!user) throw new Error('No autenticado');

      const { data, error } = await supabase
        .from('accounts')
        .insert({
          user_id: user.id,
          name: input.name,
          type: input.type,
          color: input.color,
          currency: input.currency || 'EUR',
          icon: input.icon || null,
          balance: input.balance || 0,
          sort_order: input.sort_order ?? 0,
        })
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
