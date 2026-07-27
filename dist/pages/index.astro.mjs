/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Dw515ytE.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../chunks/MainLayout_BTnB3_OG.mjs';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createContext, useState, useEffect } from 'react';
import { c as cn, A as AuthProvider } from '../chunks/cn_DPoxsKk0.mjs';
import { parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Wallet, CreditCard, PiggyBank, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
export { renderers } from '../renderers.mjs';

const ThemeContext = createContext(void 0);
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system");
  const [resolvedTheme, setResolvedTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    let resolved;
    if (theme === "system") {
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      resolved = theme;
    }
    setResolvedTheme(resolved);
    root.classList.toggle("dark", resolved === "dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);
  useEffect(() => {
    if (!mounted || theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = media.matches ? "dark" : "light";
      setResolvedTheme(resolved);
      document.documentElement.classList.toggle("dark", media.matches);
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme, mounted]);
  if (!mounted) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, resolvedTheme, setTheme }, children });
}

function formatCurrency$1(amount, currency = "EUR", locale = "es-ES") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}
function formatDateShort(date) {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "d MMM yyyy", { locale: es });
}

function BalanceCard({ title, balance, icon, color }) {
  return /* @__PURE__ */ jsx("div", { className: `rounded-2xl p-5 shadow-card ${color}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium opacity-80", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-bold", children: formatCurrency$1(balance) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-3 rounded-xl bg-white/50 dark:bg-black/20", children: icon })
  ] }) });
}
const ACCOUNTS = [
  { title: "Efectivo", balance: 285.5, icon: /* @__PURE__ */ jsx(Wallet, { className: "w-6 h-6" }), color: "bg-green-500" },
  { title: "Tarjeta Débito", balance: 1240, icon: /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6" }), color: "bg-blue-500" },
  { title: "Ahorros", balance: 5e3, icon: /* @__PURE__ */ jsx(PiggyBank, { className: "w-6 h-6" }), color: "bg-purple-500" },
  { title: "Inversiones", balance: 3200, icon: /* @__PURE__ */ jsx(TrendingUp, { className: "w-6 h-6" }), color: "bg-orange-500" }
];
function BalanceCards() {
  const total = ACCOUNTS.reduce((sum, a) => sum + a.balance, 0);
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
    ACCOUNTS.map((acc) => /* @__PURE__ */ jsx(BalanceCard, { ...acc }, acc.title)),
    /* @__PURE__ */ jsxs("div", { className: "bg-primary-50 dark:bg-primary-900/30 rounded-2xl p-5 shadow-card border border-primary-200 dark:border-primary-800", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-primary-700 dark:text-primary-300", children: "Total" }),
      /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-primary-600 dark:text-primary-400", children: formatCurrency$1(total) })
    ] })
  ] });
}

const EXPENSE_DATA = [
  { name: "Comida", value: 420, color: "#ef4444" },
  { name: "Transporte", value: 180, color: "#f97316" },
  { name: "Compras", value: 290, color: "#eab308" },
  { name: "Entretenimiento", value: 120, color: "#8b5cf6" },
  { name: "Salud", value: 85, color: "#ec4899" },
  { name: "Otros", value: 135, color: "#64748b" }
];
function ExpenseChart({ className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card h-full", className), children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Gastos por categoría" }),
    /* @__PURE__ */ jsx("div", { className: "h-64", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
      /* @__PURE__ */ jsx(
        Pie,
        {
          data: EXPENSE_DATA,
          cx: "50%",
          cy: "50%",
          innerRadius: 60,
          outerRadius: 100,
          paddingAngle: 2,
          dataKey: "value",
          nameKey: "name",
          label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`,
          children: EXPENSE_DATA.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, `cell-${index}`))
        }
      ),
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          formatter: (value) => [formatCurrency(value), ""],
          labelFormatter: (name) => name,
          contentStyle: {
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
            borderRadius: "12px"
          }
        }
      ),
      /* @__PURE__ */ jsx(Legend, { layout: "vertical", align: "right", verticalAlign: "middle", iconType: "circle", iconSize: 10, wrapperStyle: { paddingRight: 20 } })
    ] }) }) })
  ] });
}
function formatCurrency(value) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

const RECENT_TXNS = [
  { id: "1", description: "Supermercado", amount: -85.5, category: "Comida", date: "2024-01-15", icon: "🍕" },
  { id: "2", description: "Uber", amount: -12.3, category: "Transporte", date: "2024-01-14", icon: "🚗" },
  { id: "3", description: "Salario", amount: 2450, category: "Salario", date: "2024-01-10", icon: "💰" },
  { id: "4", description: "Netflix", amount: -15.99, category: "Entretenimiento", date: "2024-01-08", icon: "🎬" },
  { id: "5", description: "Farmacia", amount: -28.4, category: "Salud", date: "2024-01-07", icon: "💊" }
];
function RecentTransactions() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Últimos movimientos" }),
      /* @__PURE__ */ jsx("a", { href: "/transactions", className: "text-sm text-primary-600 hover:underline", children: "Ver todos" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: RECENT_TXNS.map((txn) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl", children: txn.icon }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: txn.description }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
            txn.category,
            " · ",
            formatDateShort(txn.date)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: txn.amount >= 0 ? "text-green-600" : "text-red-600", children: [
        txn.amount >= 0 ? "+" : "",
        formatCurrency$1(txn.amount)
      ] })
    ] }, txn.id)) })
  ] });
}

function DashboardSummary() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Resumen del mes" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-600 dark:text-gray-300", children: "Ingresos" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-green-600", children: "+€2,450.00" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-600 dark:text-gray-300", children: "Gastos" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-red-600", children: "-€1,230.50" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-t pt-3", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Balance" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-primary-600", children: "+€1,219.50" })
      ] })
    ] })
  ] });
}

function DashboardView() {
  return /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-6", children: [
    /* @__PURE__ */ jsx(BalanceCards, {}),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsx(ExpenseChart, {}),
      /* @__PURE__ */ jsx(DashboardSummary, {})
    ] }),
    /* @__PURE__ */ jsx(RecentTransactions, {})
  ] });
}

function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1e3 * 60 * 5,
        gcTime: 1e3 * 60 * 30,
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  });
}
function DashboardIsland() {
  const [queryClient] = useState(() => getQueryClient());
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(DashboardView, {}) }) }),
    /* @__PURE__ */ jsx(ReactQueryDevtools, { initialIsOpen: false })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Kios \u2014 Dashboard" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen"> ${renderComponent($$result2, "DashboardIsland", DashboardIsland, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/islands/DashboardIsland", "client:component-export": "default" })} </main> ` })}`;
}, "/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/index.astro", void 0);

const $$file = "/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
