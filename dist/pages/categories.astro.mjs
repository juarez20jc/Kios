/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Dw515ytE.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../chunks/MainLayout_BTnB3_OG.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
export { renderers } from '../renderers.mjs';

function CategoriesIsland() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Categorías" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Organiza tus movimientos" })
  ] });
}

const $$Categories = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Kios \u2014 Categor\xEDas" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen"> ${renderComponent($$result2, "CategoriesIsland", CategoriesIsland, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/islands/CategoriesIsland", "client:component-export": "default" })} </main> ` })}`;
}, "/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/categories.astro", void 0);

const $$file = "/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/categories.astro";
const $$url = "/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Categories,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
