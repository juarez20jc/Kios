import { jsx } from 'react/jsx-runtime';
import { createContext, useState, useEffect, useContext } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const supabase = createBrowserClient(
  "https://anrsohfkhryaeztovkrw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucnNvaGZraHJ5YWV6dG92a3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMTMyMzYsImV4cCI6MjEwMDY4OTIzNn0.I-7qaagXTyQOdlol2X1oSnfiyAf4CABA-8cJ5QEP2N0"
);

const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: session2 } }) => {
      setSession(session2);
      setUser(session2?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session2) => {
        setSession(session2);
        setUser(session2?.user ?? null);
        setLoading(false);
      }
    );
    return () => subscription.unsubscribe();
  }, []);
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? new Error(error.message) : null };
  };
  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error ? new Error(error.message) : null };
  };
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });
    return { error: error ? new Error(error.message) : null };
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, session, loading, signIn, signUp, signOut, resetPassword }, children });
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export { AuthProvider as A, cn as c, useAuth as u };
