import { useEffect } from 'react';
import { AuthView } from '@/features/auth/components/AuthView';
import { AuthProvider, useAuth } from '@/features/auth/providers/AuthProvider';

function AuthContent() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      window.location.href = '/Kios/';
    }
  }, [user]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center p-4 bg-background-light dark:bg-background-dark">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
    </div>;
  }

  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md">
        <AuthView />
      </div>
    </div>
  );
}

export default function AuthIsland() {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  );
}
