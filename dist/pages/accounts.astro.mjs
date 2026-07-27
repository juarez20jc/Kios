/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Dw515ytE.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../chunks/MainLayout_BTnB3_OG.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
export { renderers } from '../renderers.mjs';

function AccountsIsland() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Cuentas" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Gestión de cuentas y balances" })
  ] });
}

const $$Accounts = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Kios \u2014 Cuentas" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen"> ${renderComponent($$result2, "AccountsIsland", AccountsIsland, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/islands/AccountsIsland", "client:component-export": "default" })} </main> ` })}`;
}, "/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/accounts.astro", void 0);

const $$file = "/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/accounts.astro";
const $$url = "/accounts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Accounts,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
