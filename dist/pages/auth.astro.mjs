/* empty css                                    */
import { c as createComponent, a as renderTemplate, r as renderComponent, b as renderHead } from '../chunks/astro/server_Dw515ytE.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState } from 'react';
import { c as cn, u as useAuth, A as AuthProvider } from '../chunks/cn_DPoxsKk0.mjs';
import { EyeOff, Eye, Loader2 } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary-600 text-white hover:bg-primary-700": variant === "default",
            "bg-red-600 text-white hover:bg-red-700": variant === "destructive",
            "border border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700": variant === "outline",
            "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700": variant === "secondary",
            "hover:bg-gray-100 dark:hover:bg-gray-800": variant === "ghost",
            "text-primary-600 underline-offset-4 hover:underline": variant === "link",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-lg px-3": size === "sm",
            "h-11 rounded-xl px-8": size === "lg",
            "h-10 w-10": size === "icon"
          },
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const Label = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "label",
    {
      ref,
      className: cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      ),
      ...props
    }
  )
);
Label.displayName = "Label";

function AuthView() {
  const { signIn, signUp, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const fn = isLogin ? signIn : signUp;
    const { error: err } = await fn(email, password);
    if (err) setError(err.message);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Kios" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 mt-1", children: isLogin ? "Bienvenido de nuevo" : "Crea tu cuenta" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      error && /* @__PURE__ */ jsx("div", { className: "p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            autoComplete: "email",
            disabled: loading
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Contraseña" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: showPassword ? "text" : "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true,
              autoComplete: isLogin ? "current-password" : "new-password",
              disabled: loading
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowPassword(!showPassword),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
              children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }) : isLogin ? "Entrar" : "Registrarse" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-6 text-center text-sm text-gray-500", children: [
      isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?",
      " ",
      " ",
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsLogin(!isLogin),
          className: "text-primary-600 hover:underline font-medium",
          children: isLogin ? "Regístrate" : "Inicia sesión"
        }
      )
    ] })
  ] });
}

function AuthIsland() {
  return /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8", children: /* @__PURE__ */ jsx(AuthView, {}) }) }) });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Auth = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="es" class="h-full"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Acceso \u2014 Kios</title><link rel="icon" type="image/svg+xml" href="/favicon.svg">', '</head> <body class="h-full bg-background-light dark:bg-background-dark"> ', " <script>\n      (function() {\n        const saved = localStorage.getItem('theme');\n        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n        document.documentElement.classList.toggle('dark', saved ? saved === 'dark' : prefersDark);\n      })();\n    <\/script> </body> </html>"])), renderHead(), renderComponent($$result, "AuthIsland", AuthIsland, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/islands/AuthIsland", "client:component-export": "default" }));
}, "/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/auth.astro", void 0);

const $$file = "/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/auth.astro";
const $$url = "/auth";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Auth,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
