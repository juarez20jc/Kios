import { c as createComponent, a as renderTemplate, d as renderSlot, r as renderComponent, b as renderHead } from './astro/server_Dw515ytE.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsx } from 'react/jsx-runtime';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function QueryProvider({ children }) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1e3 * 60 * 5,
          gcTime: 1e3 * 60 * 30,
          refetchOnWindowFocus: false,
          retry: 1
        }
      }
    })
  );
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="es" class="h-full"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="theme-color" content="#0ea5e9"><title>Kios \u2014 Tus n\xFAmeros, tu casa</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="description" content="Kios - Gestor de finanzas personal inspirado en Monefy. Simple, r\xE1pido, privado.">', '</head> <body class="h-full bg-background-light dark:bg-background-dark text-text-primary antialiased"> <!-- Providers (React Islands) --> ', ' <!-- App Shell --> <div class="flex flex-col h-full min-h-screen"> <!-- Header fijo --> <header class="sticky top-0 z-40 w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark"> <div class="mx-auto max-w-screen-xl px-4 h-16 flex items-center justify-between"> <h1 class="text-xl font-bold text-primary-600 dark:text-primary-400">Kios</h1> <nav class="flex items-center gap-4"> <a href="/transactions" class="text-sm font-medium text-text-secondary hover:text-text-primary dark:hover:text-text-primary">Movimientos</a> <a href="/accounts" class="text-sm font-medium text-text-secondary hover:text-text-primary dark:hover:text-text-primary">Cuentas</a> <a href="/budgets" class="text-sm font-medium text-text-secondary hover:text-text-primary dark:hover:text-text-primary">Presupuestos</a> </nav> </div> </header> <!-- Contenido principal --> <main class="flex-1 w-full max-w-screen-xl mx-auto px-4 py-6"> ', ` </main> <!-- Footer simple --> <footer class="border-t border-border-light dark:border-border-dark py-4 text-center text-sm text-text-muted"> <p>Kios v0.1 \u2014 <a href="https://github.com/TU_USUARIO/Kios" target="_blank" rel="noopener" class="underline hover:text-primary-600">GitHub</a></p> </footer> </div> <!-- Script para theme toggle (persistido en localStorage) --> <script>
      (function() {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = saved ? saved === 'dark' : prefersDark;
        document.documentElement.classList.toggle('dark', isDark);
      })();
    <\/script> </body> </html>`])), renderHead(), renderComponent($$result, "QueryProvider", QueryProvider, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/shared/lib/query/provider", "client:component-export": "QueryProvider" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` }), renderSlot($$result, $$slots["default"]));
}, "/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
