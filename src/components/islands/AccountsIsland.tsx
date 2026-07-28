import { useState } from 'react';
import { ThemeProvider } from '@/shared/components/providers/ThemeProvider';
import { AuthProvider, useAuth } from '@/features/auth/providers/AuthProvider';
import { useAccounts } from '@/features/accounts/hooks/useAccounts';
import { useCreateAccount } from '@/features/accounts/hooks/useCreateAccount';
import { useUpdateAccount } from '@/features/accounts/hooks/useUpdateAccount';
import { useArchiveAccount } from '@/features/accounts/hooks/useArchiveAccount';
import { AccountList } from '@/features/accounts/components/AccountList';
import { AccountForm } from '@/features/accounts/components/AccountForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 30, refetchOnWindowFocus: false, retry: 1 },
    },
  });
}

function AccountsContent() {
  const { user, loading: authLoading } = useAuth();
  const { data: accounts, isLoading, error } = useAccounts();
  const createAccount = useCreateAccount();
  const updateAccount = useUpdateAccount();
  const archiveAccount = useArchiveAccount();

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<{ name: string; type: string; color: string; balance: string } | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!user) {
    window.location.href = '/Kios/';
    return null;
  }

  const total = (accounts || []).reduce((sum, a) => sum + Number(a.balance), 0);

  const handleAdd = () => {
    setEditingId(null);
    setEditingData(null);
    setFormOpen(true);
  };

  const handleEdit = (id: string) => {
    const acc = accounts?.find(a => a.id === id);
    if (!acc) return;
    setEditingId(id);
    setEditingData({ name: acc.name, type: acc.type, color: acc.color || '#64748b', balance: String(acc.balance) });
    setFormOpen(true);
  };

  const handleSave = async (data: { name: string; type: string; color: string; balance: string }) => {
    const payload = { ...data, balance: parseFloat(data.balance) || 0 };
    if (editingId) {
      await updateAccount.mutateAsync({ id: editingId, ...payload });
    } else {
      await createAccount.mutateAsync(payload);
    }
    setFormOpen(false);
  };

  const handleArchive = async (id: string) => {
    if (window.confirm('¿Archivar esta cuenta? Se ocultará del dashboard.')) {
      await archiveAccount.mutateAsync(id);
    }
  };

  return (
    <>
      <AccountList
        accounts={accounts || []}
        total={total}
        isLoading={isLoading}
        error={error}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onArchive={handleArchive}
      />
      <AccountForm
        open={formOpen}
        editingId={editingId}
        initialData={editingData}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        saving={createAccount.isPending || updateAccount.isPending}
      />
    </>
  );
}

export default function AccountsIsland() {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AccountsContent />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
