/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Dw515ytE.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../chunks/MainLayout_BTnB3_OG.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
export { renderers } from '../renderers.mjs';

function BudgetsIsland() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Presupuestos" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Control de gastos por categoría" })
  ] });
}

const $$Budgets = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Kios \u2014 Presupuestos" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen"> ${renderComponent($$result2, "BudgetsIsland", BudgetsIsland, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/islands/BudgetsIsland", "client:component-export": "default" })} </main> ` })}`;
}, "/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/budgets.astro", void 0);

const $$file = "/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/budgets.astro";
const $$url = "/budgets";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Budgets,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
