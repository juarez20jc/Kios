// src/features/auth/components/AuthView.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/features/auth/providers/AuthProvider';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export function AuthView() {
  const { signIn, signUp, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const fn = isLogin ? signIn : signUp;
    const { error: err } = await fn(email, password);
    if (err) setError(err.message);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Kios</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? 'Entrar' : 'Registrarse'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} {' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary-600 hover:underline font-medium"
        >
          {isLogin ? 'Regístrate' : 'Inicia sesión'}
        </button>
      </p>
    </div>
  );
}