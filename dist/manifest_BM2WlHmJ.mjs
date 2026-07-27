import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, e as decodeKey } from './chunks/astro/server_Dw515ytE.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/","adapterName":"","routes":[{"file":"file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/accounts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/accounts","isIndex":false,"type":"page","pattern":"^\\/accounts\\/?$","segments":[[{"content":"accounts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/accounts.astro","pathname":"/accounts","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/auth/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth","isIndex":false,"type":"page","pattern":"^\\/auth\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth.astro","pathname":"/auth","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/budgets/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/budgets","isIndex":false,"type":"page","pattern":"^\\/budgets\\/?$","segments":[[{"content":"budgets","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/budgets.astro","pathname":"/budgets","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/categories/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/categories","isIndex":false,"type":"page","pattern":"^\\/categories\\/?$","segments":[[{"content":"categories","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/categories.astro","pathname":"/categories","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/settings/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/settings","isIndex":false,"type":"page","pattern":"^\\/settings\\/?$","segments":[[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/settings.astro","pathname":"/settings","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/transactions/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/transactions","isIndex":false,"type":"page","pattern":"^\\/transactions\\/?$","segments":[[{"content":"transactions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/transactions.astro","pathname":"/transactions","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://juarez20jc.github.io/Kios","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/auth.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/accounts.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/budgets.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/categories.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/settings.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/src/pages/transactions.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/accounts@_@astro":"pages/accounts.astro.mjs","\u0000@astro-page:src/pages/auth@_@astro":"pages/auth.astro.mjs","\u0000@astro-page:src/pages/budgets@_@astro":"pages/budgets.astro.mjs","\u0000@astro-page:src/pages/categories@_@astro":"pages/categories.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/settings@_@astro":"pages/settings.astro.mjs","\u0000@astro-page:src/pages/transactions@_@astro":"pages/transactions.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-manifest":"manifest_BM2WlHmJ.mjs","@/components/islands/AccountsIsland":"_astro/AccountsIsland.BrOShLP_.js","@/components/islands/AuthIsland":"_astro/AuthIsland.Dd3ds9y5.js","@/components/islands/BudgetsIsland":"_astro/BudgetsIsland.Dard15as.js","@/components/islands/CategoriesIsland":"_astro/CategoriesIsland.DbWaLzG2.js","@/components/islands/DashboardIsland":"_astro/DashboardIsland.LE40CSv9.js","@/components/islands/SettingsIsland":"_astro/SettingsIsland.CcatJ0vn.js","@/components/islands/TransactionsIsland":"_astro/TransactionsIsland.B9MBOxln.js","@/shared/lib/query/provider":"_astro/provider.DStJbhKi.js","@astrojs/react/client.js":"_astro/client.CaOyRcmD.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/accounts/index.html","/file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/auth/index.html","/file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/budgets/index.html","/file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/categories/index.html","/file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/settings/index.html","/file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/transactions/index.html","/file:///mnt/c/Users/jjuar/OneDrive/Escritorio/Kios/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"qZxlufeZceUiI2SqMFl/DTrYkiBGLcqgb0K1oZhoHY0=","experimentalEnvGetSecretEnabled":false});

export { manifest };
