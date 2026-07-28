// src/features/auth/components/AuthView.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/features/auth/providers/AuthProvider';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';

export function AuthView() {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fn = isLogin ? signIn : signUp;
    const { error: err } = await fn(email, password);
    if (err) {
      setError(err.message);
      setSubmitting(false);
    } else {
      window.location.href = '/Kios/';
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="w-full">
      {/* Logo / Brand */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0L12 6z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary">Kios</h1>
        <p className="text-text-muted mt-1">
          {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
        </p>
      </div>

      {/* Card Form */}
      <Card className="shadow-card border-border-light dark:border-border-dark">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-center">
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className={cn(
                'p-3 rounded-xl text-sm flex items-center gap-2 animate-slide-up',
                'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
              )}>
                <Lock className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-text-secondary">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  autoComplete="email"
                  disabled={submitting}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-text-secondary">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" aria-hidden="true" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  disabled={submitting}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full py-3 rounded-xl text-base font-medium" disabled={submitting}>
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isLogin ? 'Entrando...' : 'Creando cuenta...'}
                </span>
              ) : (
                isLogin ? 'Entrar' : 'Crear cuenta'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-border-light dark:border-border-dark">
            <p className="text-center text-sm text-text-muted">
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} {' '}
              <button
                onClick={toggleMode}
                className="text-primary-600 dark:text-primary-400 font-medium hover:underline transition-colors"
              >
                {isLogin ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-center text-xs text-text-muted mt-6">
        Al continuar, aceptas nuestros <a href="#" className="underline hover:text-primary-600">Términos</a> y <a href="#" className="underline hover:text-primary-600">Privacidad</a>
      </p>
    </div>
  );
}