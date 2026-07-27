// src/components/islands/AuthIsland.tsx
import { AuthView } from '@/features/auth/components/AuthView';
import { AuthProvider } from '@/features/auth/providers/AuthProvider';

export default function AuthIsland() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center p-4 bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-md">
          <AuthView />
        </div>
      </div>
    </AuthProvider>
  );
}