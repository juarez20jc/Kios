// src/components/islands/AuthIsland.tsx
import { AuthView } from '@/features/auth/components/AuthView';
import { AuthProvider } from '@/features/auth/providers/AuthProvider';

export default function AuthIsland() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <AuthView />
        </div>
      </div>
    </AuthProvider>
  );
}