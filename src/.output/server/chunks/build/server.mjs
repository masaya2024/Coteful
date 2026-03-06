import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineComponent, computed, h, toValue, getCurrentInstance, onServerPrefetch, hasInjectionContext, inject, ref, toRef, isRef, shallowRef, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, nextTick, defineAsyncComponent, provide, shallowReactive, Suspense, Fragment, createElementBlock, cloneVNode, useSSRContext, createApp, withAsyncContext, createVNode, onErrorCaptured, resolveDynamicComponent, reactive, effectScope, getCurrentScope, isReadonly, isShallow, isReactive, toRaw } from 'vue';
import { a4 as createError$1, a9 as klona, aa as hasProtocol, ab as isScriptProtocol, a7 as joinURL, ac as parseQuery, ad as parse, ae as getRequestHeader, a5 as destr, af as isEqual, ag as withQuery, ah as sanitizeStatusCode, ai as parseURL, aj as encodePath, ak as decodePath, al as defuFn, s as setCookie, N as getCookie, V as deleteCookie, am as getContext, an as withTrailingSlash, ao as withoutTrailingSlash, ap as $fetch$1, aq as baseURL, ar as createHooks, as as defu, at as executeAsync } from '../nitro/nitro.mjs';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { Icon, getIcon, loadIcon as loadIcon$1, addIcon, _api, addAPIProvider, setCustomIconsLoader } from '@iconify/vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode } from 'vue/server-renderer';
import { getIconCSS } from '@iconify/utils/lib/css/icon';
import { debounce } from 'perfect-debounce';
import { u as useHead$1, h as headSymbol } from '../routes/renderer.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": false };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    versions: {
      get nuxt() {
        return "4.3.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
  return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
function encodeRoutePath(url) {
  const parsed = parseURL(url);
  return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  Object.defineProperty(nuxtError, "status", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusCode,
    configurable: true
  });
  Object.defineProperty(nuxtError, "statusText", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusMessage,
    configurable: true
  });
  return nuxtError;
};
const unhead_PtamfB47yqQY_Rh4zjrimgYJkXOrkZ_s7Rhm1JWaAcQ = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const matcher = /* @__PURE__ */ (() => {
  const $0 = {};
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/");
    s.length - 1;
    if (s[1] === "api") {
      r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
    }
    return r;
  };
})();
const _routeRulesMatcher = (path) => defu({}, ...matcher("", path).map((r) => r.data).reverse());
const routeRulesMatcher$1 = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher$1(path);
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
const __nuxt_page_meta$3 = {
  layout: false
};
const __nuxt_page_meta$2 = {
  layout: "public"
};
const __nuxt_page_meta$1 = {
  layout: false
};
const __nuxt_page_meta = {
  layout: "public"
};
const _routes = [
  {
    name: "400",
    path: "/400",
    meta: __nuxt_page_meta$3 || {},
    component: () => import('./400-BNQmduaN.mjs')
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index-yUgoRAOm.mjs')
  },
  {
    name: "login",
    path: "/login",
    meta: __nuxt_page_meta$2 || {},
    component: () => import('./login-DLALif-g.mjs')
  },
  {
    name: "reload",
    path: "/reload",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./reload-ByUZ4h_o.mjs')
  },
  {
    name: "contact",
    path: "/contact",
    meta: __nuxt_page_meta || {},
    component: () => import('./contact-CJjfdAXo.mjs')
  },
  {
    name: "support",
    path: "/support",
    component: () => import('./support-DZ0_WZAa.mjs')
  },
  {
    name: "projects",
    path: "/projects",
    component: () => import('./projects-CeKRGLpG.mjs')
  },
  {
    name: "media-new",
    path: "/media/new",
    component: () => import('./new-CHDuNDDj.mjs')
  },
  {
    name: "media-id",
    path: "/media/:id()",
    component: () => import('./_id_-Dmi4HfPF.mjs')
  },
  {
    name: "models-new",
    path: "/models/new",
    component: () => import('./new-C9rO3o4v.mjs')
  },
  {
    name: "entries-new",
    path: "/entries/new",
    component: () => import('./new-DzS47cVv.mjs')
  },
  {
    name: "media",
    path: "/media",
    component: () => import('./index-I6CQR3gN.mjs')
  },
  {
    name: "models-id",
    path: "/models/:id()",
    component: () => import('./_id_-B5D9o_vy.mjs')
  },
  {
    name: "api-settings",
    path: "/api-settings",
    component: () => import('./api-settings-DQmIy0TB.mjs')
  },
  {
    name: "entries-id",
    path: "/entries/:id()",
    component: () => import('./_id_-CKY8HOLn.mjs')
  },
  {
    name: "models",
    path: "/models",
    component: () => import('./index-DbrEkWPl.mjs')
  },
  {
    name: "entries",
    path: "/entries",
    component: () => import('./index-CQFPiGz6.mjs')
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => children.default?.() };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index2) => comp.components && comp.components.default === from.matched[index2]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    status: result && (result.status || result.statusCode) || 404,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || useNuxtApp();
  return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      const head = inject(headSymbol);
      if (!head) {
        throw new Error("[nuxt] [unhead] Missing Unhead instance.");
      }
      return head;
    }
  });
}
function useHead(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useHead$1(input, { head, ...options });
}
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => {
    const decoded = decodeURIComponent(val);
    const parsed = destr(decoded);
    if (typeof parsed === "number" && (!Number.isFinite(parsed) || String(parsed) !== decoded)) {
      return decoded;
    }
    return parsed;
  },
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const auth_45global = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  const sessionId = useCookie("conteful-session-id", {
    sameSite: "lax"
  });
  const publicRoutes = /* @__PURE__ */ new Set(["/login", "/contact", "/400", "/reload"]);
  const isLoginRoute = to.path === "/login";
  const isPublicRoute = publicRoutes.has(to.path);
  const isAuthenticated = Boolean(sessionId.value);
  if (!isAuthenticated && !isPublicRoute) {
    return navigateTo("/login");
  }
  if (isAuthenticated && isLoginRoute) {
    return navigateTo("/");
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  auth_45global,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      if (to.matched.at(-1)?.components?.default === from.matched.at(-1)?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    const error = /* @__PURE__ */ useError();
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        const routeRules = getRouteRules({ path: to.path });
        if (routeRules.appMiddleware) {
          for (const key in routeRules.appMiddleware) {
            if (routeRules.appMiddleware[key]) {
              middlewareEntries.add(key);
            } else {
              middlewareEntries.delete(key);
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0 && !error.value) {
        return nuxtApp.runWithContext(() => showError(createError({
          status: 404,
          fatal: false,
          statusText: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_Ws8SUMTo68XWM_TEhuJIQbORo_qC7bnyjJcGdGVwAYw = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const LazyIcon = defineAsyncComponent(() => Promise.resolve().then(() => index).then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["Icon", LazyIcon]
];
const components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const inlineConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};
const __appConfig = /* @__PURE__ */ defuFn(inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  nuxtApp._appConfig ||= klona(__appConfig);
  return nuxtApp._appConfig;
}
const plugin_c515ayiLuocRMvhGInzV4Ci6HK9AGMOPyzAKHLWV3Qg = /* @__PURE__ */ defineNuxtPlugin({
  name: "@nuxt/icon",
  setup() {
    const configs = /* @__PURE__ */ useRuntimeConfig();
    const options = useAppConfig().icon;
    _api.setFetch($fetch.native);
    const resources = [];
    if (options.provider === "server") {
      const baseURL2 = configs.app?.baseURL?.replace(/\/$/, "") ?? "";
      resources.push(baseURL2 + (options.localApiEndpoint || "/api/_nuxt_icon"));
      if (options.fallbackToApi === true || options.fallbackToApi === "client-only") {
        resources.push(options.iconifyApiEndpoint);
      }
    } else if (options.provider === "none") {
      _api.setFetch(() => Promise.resolve(new Response()));
    } else {
      resources.push(options.iconifyApiEndpoint);
    }
    async function customIconLoader(icons, prefix) {
      try {
        const data = await $fetch(resources[0] + "/" + prefix + ".json", {
          query: {
            icons: icons.join(",")
          }
        });
        if (!data || data.prefix !== prefix || !data.icons)
          throw new Error("Invalid data" + JSON.stringify(data));
        return data;
      } catch (e) {
        console.error("Failed to load custom icons", e);
        return null;
      }
    }
    addAPIProvider("", { resources });
    for (const prefix of options.customCollections || []) {
      if (prefix)
        setCustomIconsLoader(customIconLoader, prefix);
    }
  }
  // For type portability
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});
const plugins = [
  unhead_PtamfB47yqQY_Rh4zjrimgYJkXOrkZ_s7Rhm1JWaAcQ,
  plugin,
  revive_payload_server_Ws8SUMTo68XWM_TEhuJIQbORo_qC7bnyjJcGdGVwAYw,
  components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8,
  plugin_c515ayiLuocRMvhGInzV4Ci6HK9AGMOPyzAKHLWV3Qg
];
const layouts = {
  default: defineAsyncComponent(() => import('./default-BwEKE-rL.mjs').then((m) => m.default || m)),
  public: defineAsyncComponent(() => import('./public-DRlllW_K.mjs').then((m) => m.default || m))
};
const routeRulesMatcher = _routeRulesMatcher;
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_0$3 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route?.meta.layout ?? routeRulesMatcher(route?.path).appLayout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route?.meta.layoutTransition ?? appLayoutTransition;
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, route.meta.layoutProps ?? {}, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              isRenderingNewLayout: (name) => {
                return name !== previouslyRenderedLayout && name === layout.value;
              },
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        // When name=false, always return true so NuxtPage doesn't skip rendering
        isCurrent: (route) => name === false || name === (route.meta.layout ?? routeRulesMatcher(route.path).appLayout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_1$2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
let _initialized = false;
function init(addIcon2) {
  if (_initialized)
    return;
  const collections = JSON.parse('[{"prefix":"lucide","icons":{"layout-dashboard":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><rect width=\\"7\\" height=\\"9\\" x=\\"3\\" y=\\"3\\" rx=\\"1\\"/><rect width=\\"7\\" height=\\"5\\" x=\\"14\\" y=\\"3\\" rx=\\"1\\"/><rect width=\\"7\\" height=\\"9\\" x=\\"14\\" y=\\"12\\" rx=\\"1\\"/><rect width=\\"7\\" height=\\"5\\" x=\\"3\\" y=\\"16\\" rx=\\"1\\"/></g>"},"folder-kanban":{"width":24,"height":24,"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2m4-10v4m4-4v2m4-2v6\\"/>"},"folder-plus":{"width":24,"height":24,"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M12 10v6m-3-3h6m5 7a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\\"/>"},"blocks":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2\\"/><rect width=\\"8\\" height=\\"8\\" x=\\"14\\" y=\\"2\\" rx=\\"1\\"/></g>"},"file-pen-line":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004zm.123-5.776A1 1 0 0 1 14 7V2\\"/><path d=\\"M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516M8 18h1\\"/></g>"},"image":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><rect width=\\"18\\" height=\\"18\\" x=\\"3\\" y=\\"3\\" rx=\\"2\\" ry=\\"2\\"/><circle cx=\\"9\\" cy=\\"9\\" r=\\"2\\"/><path d=\\"m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21\\"/></g>"},"key-round":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\\"/><circle cx=\\"16.5\\" cy=\\"7.5\\" r=\\".5\\" fill=\\"currentColor\\"/></g>"},"webhook":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2\\"/><path d=\\"m6 17l3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06\\"/><path d=\\"m12 6l3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8\\"/></g>"},"users":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87\\"/><circle cx=\\"9\\" cy=\\"7\\" r=\\"4\\"/></g>"},"user-plus":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\\"/><circle cx=\\"9\\" cy=\\"7\\" r=\\"4\\"/><path d=\\"M19 8v6m3-3h-6\\"/></g>"},"plus":{"width":24,"height":24,"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M5 12h14m-7-7v14\\"/>"},"check":{"width":24,"height":24,"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M20 6L9 17l-5-5\\"/>"},"chevron-right":{"width":24,"height":24,"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"m9 18l6-6l-6-6\\"/>"},"arrow-up-right":{"width":24,"height":24,"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M7 7h10v10M7 17L17 7\\"/>"},"log-in":{"width":24,"height":24,"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"m10 17l5-5l-5-5m5 5H3m12-9h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\\"/>"},"log-out":{"width":24,"height":24,"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\\"/>"},"save":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z\\"/><path d=\\"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7\\"/></g>"},"trash-2":{"width":24,"height":24,"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M10 11v6m4-6v6m5-11v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\\"/>"},"eye":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0\\"/><circle cx=\\"12\\" cy=\\"12\\" r=\\"3\\"/></g>"},"search":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"m21 21l-4.34-4.34\\"/><circle cx=\\"11\\" cy=\\"11\\" r=\\"8\\"/></g>"},"life-buoy":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><circle cx=\\"12\\" cy=\\"12\\" r=\\"10\\"/><path d=\\"m4.93 4.93l4.24 4.24m5.66 0l4.24-4.24m-4.24 9.9l4.24 4.24m-9.9-4.24l-4.24 4.24\\"/><circle cx=\\"12\\" cy=\\"12\\" r=\\"4\\"/></g>"},"mail":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7\\"/><rect width=\\"20\\" height=\\"16\\" x=\\"2\\" y=\\"4\\" rx=\\"2\\"/></g>"},"chevrons-up-down":{"width":24,"height":24,"body":"<path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"m7 15l5 5l5-5M7 9l5-5l5 5\\"/>"},"refresh-cw":{"width":24,"height":24,"body":"<g fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\"><path d=\\"M3 12a9 9 0 0 1 9-9a9.75 9.75 0 0 1 6.74 2.74L21 8\\"/><path d=\\"M21 3v5h-5m5 4a9 9 0 0 1-9 9a9.75 9.75 0 0 1-6.74-2.74L3 16\\"/><path d=\\"M8 16H3v5\\"/></g>"}}}]');
  for (const collection of collections) {
    for (const [name, data] of Object.entries(collection.icons)) {
      addIcon2(collection.prefix ? collection.prefix + ":" + name : name, data);
    }
  }
  _initialized = true;
}
async function loadIcon(name, timeout) {
  if (!name)
    return null;
  init(addIcon);
  const _icon = getIcon(name);
  if (_icon)
    return _icon;
  let timeoutWarn;
  const load = loadIcon$1(name).catch(() => {
    console.warn(`[Icon] failed to load icon \`${name}\``);
    return null;
  });
  if (timeout > 0)
    await Promise.race([
      load,
      new Promise((resolve) => {
        timeoutWarn = setTimeout(() => {
          console.warn(`[Icon] loading icon \`${name}\` timed out after ${timeout}ms`);
          resolve();
        }, timeout);
      })
    ]).finally(() => clearTimeout(timeoutWarn));
  else
    await load;
  return getIcon(name);
}
function useResolvedName(getName) {
  const options = useAppConfig().icon;
  const collections = (options.collections || []).sort((a, b) => b.length - a.length);
  return computed(() => {
    const name = getName();
    const bare = name.startsWith(options.cssSelectorPrefix) ? name.slice(options.cssSelectorPrefix.length) : name;
    const resolved = options.aliases?.[bare] || bare;
    if (!resolved.includes(":")) {
      const collection = collections.find((c) => resolved.startsWith(c + "-"));
      return collection ? collection + ":" + resolved.slice(collection.length + 1) : resolved;
    }
    return resolved;
  });
}
function resolveCustomizeFn(customize, globalCustomize) {
  if (customize === false) return void 0;
  if (customize === true || customize === null) return globalCustomize;
  return customize;
}
const SYMBOL_SERVER_CSS = "NUXT_ICONS_SERVER_CSS";
function escapeCssSelector(selector) {
  return selector.replace(/([^\w-])/g, "\\$1");
}
const NuxtIconCss = /* @__PURE__ */ defineComponent({
  name: "NuxtIconCss",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props) {
    const nuxt = useNuxtApp();
    const options = useAppConfig().icon;
    const cssClass = computed(() => props.name ? options.cssSelectorPrefix + props.name : "");
    const selector = computed(() => "." + escapeCssSelector(cssClass.value));
    function getCSS(icon, withLayer = true) {
      let iconSelector = selector.value;
      if (options.cssWherePseudo) {
        iconSelector = `:where(${iconSelector})`;
      }
      const css = getIconCSS(icon, {
        iconSelector,
        format: "compressed",
        customise: resolveCustomizeFn(props.customize, options.customize)
      });
      if (options.cssLayer && withLayer) {
        return `@layer ${options.cssLayer} { ${css} }`;
      }
      return css;
    }
    onServerPrefetch(async () => {
      {
        const configs = (/* @__PURE__ */ useRuntimeConfig()).icon || {};
        if (!configs?.serverKnownCssClasses?.includes(cssClass.value)) {
          const icon = await loadIcon(props.name, options.fetchTimeout).catch(() => null);
          if (!icon)
            return null;
          let ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS];
          if (!ssrCSS) {
            ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS] = /* @__PURE__ */ new Map();
            nuxt.runWithContext(() => {
              useHead({
                style: [
                  () => {
                    const sep = "";
                    let css = Array.from(ssrCSS.values()).sort().join(sep);
                    if (options.cssLayer) {
                      css = `@layer ${options.cssLayer} {${sep}${css}${sep}}`;
                    }
                    return { innerHTML: css };
                  }
                ]
              }, {
                tagPriority: "low"
              });
            });
          }
          if (props.name && !ssrCSS.has(props.name)) {
            const css = getCSS(icon, false);
            ssrCSS.set(props.name, css);
          }
          return null;
        }
      }
    });
    return () => h("span", { class: ["iconify", cssClass.value] });
  }
});
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry2 = nuxtApp._asyncData[key.value];
      if (entry2?._abortController) {
        try {
          entry2._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry2._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
async function refreshNuxtData(keys) {
  {
    return Promise.resolve();
  }
}
function clearNuxtData(keys) {
  const nuxtApp = useNuxtApp();
  const _allKeys = Object.keys(nuxtApp.payload.data);
  const _keys = _allKeys;
  for (const key of _keys) {
    clearNuxtDataByKey(nuxtApp, key);
  }
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
const NuxtIconSvg = /* @__PURE__ */ defineComponent({
  name: "NuxtIconSvg",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props, { slots }) {
    useNuxtApp();
    const options = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const storeKey = "i-" + name.value;
    if (name.value) {
      onServerPrefetch(async () => {
        {
          await useAsyncData(
            storeKey,
            async () => await loadIcon(name.value, options.fetchTimeout),
            { deep: false }
          );
        }
      });
    }
    return () => h(Icon, {
      icon: name.value,
      ssr: true,
      // Iconify uses `customise`, where we expose `customize` for consistency
      customise: resolveCustomizeFn(props.customize, options.customize)
    }, slots);
  }
});
const __nuxt_component_1$1 = defineComponent({
  name: "NuxtIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      required: false,
      default: null
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props, { slots }) {
    const nuxtApp = useNuxtApp();
    const runtimeOptions = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const component = computed(
      () => nuxtApp.vueApp?.component(name.value) || ((props.mode || runtimeOptions.mode) === "svg" ? NuxtIconSvg : NuxtIconCss)
    );
    const style = computed(() => {
      const size = props.size || runtimeOptions.size;
      return size ? { fontSize: Number.isNaN(+size) ? size : size + "px" } : null;
    });
    return () => h(
      component.value,
      {
        ...runtimeOptions.attrs,
        name: name.value,
        class: runtimeOptions.class,
        style: style.value,
        customize: props.customize
      },
      slots
    );
  }
});
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_1$1
}, Symbol.toStringTag, { value: "Module" }));
const messages = {
  ja: {
    "lang.ja": "日本語",
    "lang.en": "English",
    "nav.dashboard": "ダッシュボード",
    "nav.projects": "プロジェクト",
    "nav.models": "コンテンツモデル",
    "nav.entries": "エントリー",
    "nav.media": "メディア",
    "nav.api": "API 設定",
    "sidebar.title": "コンテンツ構造と配信を一つの管理画面で運用します。",
    "sidebar.description": "フラットな一覧、素早い編集、将来のヘッドレス CMS バックエンドを見据えたモック API で構成しています。",
    "sidebar.currentProject": "現在のプロジェクト",
    "sidebar.noProject": "プロジェクト未選択",
    "sidebar.projectDescriptionFallback": "参加中のプロジェクトを切り替えて、モデル・エントリー・Webhook をまとめて管理します。",
    "sidebar.switchProject": "プロジェクトを切り替え",
    "sidebar.pendingInvites": "招待",
    "sidebar.signedInAs": "ログイン中",
    "sidebar.guestName": "未ログイン",
    "sidebar.guestEmail": "セッションがありません",
    "sidebar.manageProjects": "プロジェクト管理",
    "sidebar.contactSupport": "問い合わせ",
    "sidebar.postureTitle": "MVP 方針",
    "sidebar.postureBody": "まずはモックデータ。API 前提の型と UI を優先し、カード過多にはしません。",
    "sidebar.language": "表示言語",
    "public.top": "TOP",
    "public.login": "ログイン",
    "public.contact": "問い合わせ",
    "public.language": "言語",
    "common.refresh": "更新",
    "common.refreshSnapshot": "最新スナップショットを取得",
    "common.search": "検索",
    "common.total": "合計",
    "common.status": "ステータス",
    "common.updated": "更新日時",
    "common.created": "作成日時",
    "common.fields": "フィールド",
    "common.cancel": "キャンセル",
    "common.edit": "編集",
    "common.delete": "削除",
    "common.save": "保存",
    "common.register": "登録",
    "common.generate": "生成",
    "common.invalidate": "無効化",
    "common.loadingDashboard": "ダッシュボードを読み込み中です...",
    "common.yes": "はい",
    "common.no": "いいえ",
    "common.allModels": "すべてのモデル",
    "reload.title": "再読み込み中",
    "reload.message": "・・・・が波を打つ間に、最新の状態へ切り替えています。",
    "auth.title": "複数プロジェクトを横断して、コンテンツ運用を一つの入口から管理します。",
    "auth.description": "招待、切り替え、Webhook 設定まで含めて同じワークスペースで扱えるログイン画面です。",
    "auth.demoTitle": "デモログイン",
    "auth.demoMessage": "下のアカウントを選ぶか、メールアドレスを入力して共通パスワードでログインしてください。",
    "auth.signInEyebrow": "サインイン",
    "auth.signInTitle": "ワークスペースに入る",
    "auth.signInDescription": "現在のセッションと選択中プロジェクトは保持され、サイドバーからいつでも切り替えられます。",
    "auth.email": "メールアドレス",
    "auth.password": "パスワード",
    "auth.submit": "ログイン",
    "auth.loginFailed": "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
    "auth.logout": "ログアウト",
    "contact.publicEyebrow": "問い合わせ",
    "contact.publicTitle": "未ログインでも、そのまま相談できます。",
    "contact.publicDescription": "導入前の確認、デモ依頼、料金や運用の相談はこの画面から送れます。ログイン済みでサポートを受けたい場合は、ワークスペース側の問い合わせ画面を使ってください。",
    "contact.memberShortcut": "ログイン済みの問い合わせへ",
    "contact.memberEyebrow": "サポート",
    "contact.memberTitle": "現在のワークスペース情報を添えて問い合わせできます。",
    "contact.memberDescription": "ログイン中のユーザーと現在のプロジェクトを自動で添えて、運用中の相談や不具合報告を送るための窓口です。",
    "contact.formTitle": "問い合わせ内容をまとめる",
    "contact.formDescriptionPublic": "未ログイン時は連絡先を入力してください。件名と本文を整えた状態でメールアプリを開きます。",
    "contact.formDescriptionMember": "ログイン済みの問い合わせでは、返信に必要なアカウント情報と現在のプロジェクト名を本文へ含めます。",
    "contact.targetLabel": "送信先",
    "contact.targetHint": "送信ボタンで既定のメールアプリを開き、件名と本文を自動入力します。",
    "contact.contextUser": "ユーザー",
    "contact.contextEmail": "返信先メール",
    "contact.contextProject": "現在のプロジェクト",
    "contact.contextFlow": "問い合わせ種別",
    "contact.contextFlowPublic": "未ログインの相談",
    "contact.contextReply": "返信先",
    "contact.contextReplyPending": "メールアドレス入力後に反映",
    "contact.projectFallback": "プロジェクト未選択",
    "contact.company": "会社名",
    "contact.name": "お名前",
    "contact.email": "メールアドレス",
    "contact.topic": "問い合わせ種別",
    "contact.message": "内容",
    "contact.messagePlaceholderPublic": "検討中の用途、困っている点、導入予定時期などを記入してください。",
    "contact.messagePlaceholderMember": "発生している事象、期待する動作、運用上の相談内容などを記入してください。",
    "contact.responseTitle": "案内",
    "contact.responseBodyPublic": "未ログイン向け問い合わせでは、会社名と返信先メールを本文へ含めて送信します。",
    "contact.responseBodyMember": "ログイン済みの問い合わせでは、ユーザー情報と現在のプロジェクトを本文へ含めて送信します。",
    "contact.openPublicMail": "問い合わせメールを作成",
    "contact.openMemberMail": "サポートメールを作成",
    "contact.missingPublic": "お名前、メールアドレス、問い合わせ内容を入力すると送信できます。",
    "contact.missingMember": "ログイン情報の読み込みと問い合わせ内容の入力が完了すると送信できます。",
    "contact.topic.sales": "導入の相談",
    "contact.topic.demo": "デモ依頼",
    "contact.topic.pricing": "料金・契約",
    "contact.topic.general": "その他",
    "contact.topic.bug": "不具合報告",
    "contact.topic.feature": "機能要望",
    "contact.topic.account": "アカウント相談",
    "contact.topic.operations": "運用相談",
    "fieldType.text": "テキスト",
    "fieldType.textarea": "テキストエリア",
    "fieldType.richText": "リッチテキスト",
    "fieldType.number": "数値",
    "fieldType.boolean": "真偽値",
    "fieldType.date": "日付",
    "fieldType.json": "JSON",
    "fieldType.media": "メディア",
    "fieldType.reference": "参照",
    "status.active": "有効",
    "status.draft": "下書き",
    "status.published": "公開",
    "status.revoked": "無効",
    "token.delivery": "Delivery API",
    "token.management": "Management API",
    "confirm.deleteModel": ({ name }) => `モデル「${name}」を削除しますか？`,
    "confirm.deleteEntry": ({ name }) => `エントリー「${name}」を削除しますか？`,
    "confirm.deleteMedia": ({ name }) => `メディア「${name}」を削除しますか？`,
    "confirm.invalidateToken": ({ name }) => `トークン「${name}」を無効化しますか？`,
    "confirm.revokeInvite": ({ email }) => `招待「${email}」を取り消しますか？`,
    "confirm.deleteWebhook": ({ name }) => `Webhook「${name}」を削除しますか？`,
    "dashboard.eyebrow": "概要",
    "dashboard.title": "コンテンツ運用を一覧で把握",
    "dashboard.description": "Conteful は構造定義、エントリー編集、メディア管理、API 公開をフラットな流れで扱います。",
    "dashboard.metricModels": "コンテンツモデル",
    "dashboard.metricModelsCaption": "エントリー作成と配信 API の構造を決めるスキーマです。",
    "dashboard.metricEntries": "エントリー",
    "dashboard.metricEntriesCaption": "アクティブなモデルから生成された下書き・公開済みコンテンツです。",
    "dashboard.metricMedia": "メディア",
    "dashboard.metricMediaCaption": "エントリーから参照できるメタデータ中心のアセットです。",
    "dashboard.quickActions": "クイックアクション",
    "dashboard.quickActionModel": "コンテンツモデルを作成",
    "dashboard.quickActionModelNote": "フィールド、バリデーション、API キーを定義します。",
    "dashboard.quickActionEntry": "エントリーを作成",
    "dashboard.quickActionEntryNote": "モデル定義からフォームを自動生成します。",
    "dashboard.quickActionMedia": "メディアを登録",
    "dashboard.quickActionMediaNote": "モック URL とメタデータでアップロードを疑似再現します。",
    "dashboard.recentModelsEyebrow": "最近更新したモデル",
    "dashboard.recentModelsTitle": "スキーマ変更",
    "dashboard.recentEntriesEyebrow": "最近更新したエントリー",
    "dashboard.recentEntriesTitle": "コンテンツ更新",
    "dashboard.latestMediaEyebrow": "最新メディア",
    "dashboard.noModelsTitle": "モデルがまだありません",
    "dashboard.noModelsMessage": "最初にコンテンツモデルを定義すると、エントリーフォームと配信 API がそこから派生します。",
    "dashboard.noEntriesTitle": "エントリーがまだありません",
    "dashboard.noEntriesMessage": "モデルからエントリーを作成すると、公開状態と API 形状をここで確認できます。",
    "dashboard.noMediaTitle": "メディアがまだありません",
    "dashboard.noMediaMessage": "メディアを追加すると、エントリーの `media` フィールドから選択できるようになります。",
    "models.index.eyebrow": "コンテンツモデル",
    "models.index.title": "コンテンツスキーマを管理",
    "models.index.description": "各モデルがエントリーの入力項目、バリデーション、配信 API の形を決めます。",
    "models.index.searchLabel": "モデルを検索",
    "models.index.searchPlaceholder": "モデル名、api id、説明で検索",
    "models.index.new": "新規モデル",
    "models.index.noResultsTitle": "一致するモデルがありません",
    "models.index.noResultsMessage": "検索条件を広げるか、最初のコンテンツモデルを作成してください。",
    "models.new.eyebrow": "コンテンツモデル",
    "models.new.title": "新しいモデルを作成",
    "models.new.description": "一度定義した構造を、一覧、詳細、配信 API の各フローで再利用します。",
    "models.detail.eyebrow": "コンテンツモデル",
    "models.detail.descriptionFallback": "フィールド定義、一覧表示、API 出力の設定を編集します。",
    "models.detail.delete": "モデルを削除",
    "models.detail.snapshot": "モデル概要",
    "models.detail.apiPath": "API パス",
    "models.detail.entriesUsing": "このモデルを使うエントリー数",
    "models.detail.relatedEntriesEyebrow": "関連エントリー",
    "models.detail.relatedEntriesTitle": "このモデルから作成された最新コンテンツ",
    "models.detail.newEntry": "新規エントリー",
    "models.detail.noEntriesTitle": "まだエントリーがありません",
    "models.detail.noEntriesMessage": "モデル定義は完了していますが、このモデルから作られたエントリーはまだありません。",
    "entries.index.eyebrow": "エントリー",
    "entries.index.title": "コンテンツ項目を管理",
    "entries.index.description": "エントリーはモデル定義から生成され、下書きまたは公開済みコンテンツとして保存されます。",
    "entries.index.searchLabel": "エントリーを検索",
    "entries.index.searchPlaceholder": "タイトル、slug、ステータスで検索",
    "entries.index.new": "新規エントリー",
    "entries.index.noResultsTitle": "一致するエントリーがありません",
    "entries.index.noResultsMessage": "検索条件を広げるか、新しいエントリーを作成してください。",
    "entries.new.eyebrow": "エントリー",
    "entries.new.title": "新しいエントリーを作成",
    "entries.new.description": "モデルを選ぶと、そのフィールド定義から入力フォームが自動生成されます。",
    "entries.detail.eyebrow": "エントリー",
    "entries.detail.updatedPrefix": "最終更新",
    "entries.detail.delete": "エントリーを削除",
    "media.index.eyebrow": "メディア",
    "media.index.title": "登録済みアセットを管理",
    "media.index.description": "MVP ではメディアのメタデータのみを保持し、将来のストレージと CDN 連携に備えた構造を維持します。",
    "media.index.new": "メディア登録",
    "media.index.searchLabel": "メディアを検索",
    "media.index.searchPlaceholder": "ファイル名、MIME、alt、タグで検索",
    "media.index.tagFilterLabel": "タグで絞り込む",
    "media.index.allTags": "すべてのタグ",
    "media.index.columnMedia": "メディア",
    "media.index.thumb": "サムネイル",
    "media.index.noResultsTitle": "一致するメディアがありません",
    "media.index.noResultsMessage": "メディアを追加するか、検索条件を広げてください。",
    "media.new.eyebrow": "メディア",
    "media.new.title": "メディアを登録",
    "media.new.description": "この MVP ではファイルアップロードを疑似化し、メタデータとモック URL を保存します。",
    "media.detail.eyebrow": "メディア",
    "media.detail.updatedPrefix": "最終更新",
    "media.detail.delete": "メディアを削除",
    "media.detail.snapshot": "メディア概要",
    "media.detail.mime": "MIME type",
    "media.detail.size": "サイズ",
    "media.detail.url": "URL",
    "media.detail.created": "作成日時",
    "api.eyebrow": "API 設定",
    "api.title": "管理 API と Delivery API を準備",
    "api.description": "トークン管理は MVP ではモックですが、エンドポイント分離とレスポンス形式は本番境界を想定しています。",
    "api.tokenManagement": "トークン管理",
    "api.tokenTitle": "公開・管理トークン",
    "api.tokenName": "トークン名",
    "api.kind": "種別",
    "api.noTokensTitle": "トークンがまだありません",
    "api.noTokensMessage": "Delivery または Management のモックトークンを生成して、認証導入の形を先に固めます。",
    "api.baseUrl": "ベース URL",
    "api.activeProject": ({ name }) => `現在のプロジェクト: ${name}`,
    "api.endpoints": "エンドポイント例",
    "api.previewEyebrow": "Delivery Preview",
    "api.previewTitle": "公開 API を実データで確認",
    "api.previewModelLabel": "モデル",
    "api.previewSearchLabel": "公開 Entry を検索",
    "api.previewSearchPlaceholder": "タイトル、slug で検索",
    "api.previewAction": "プレビュー更新",
    "api.previewEndpoint": "確認中エンドポイント",
    "api.previewPublishedCount": "公開件数",
    "api.previewProjectScope": "project scope",
    "api.previewListTitle": "公開中エントリー",
    "api.previewResponseTitle": "実レスポンス",
    "api.previewLoading": "Delivery API を読み込み中です...",
    "api.previewNoModelsTitle": "プレビューできるモデルがありません",
    "api.previewNoModelsMessage": "先にコンテンツモデルを作成すると、公開 API の応答をここで確認できます。",
    "api.previewNoEntriesTitle": "公開中の Entry はありません",
    "api.previewNoEntriesMessage": "選択中モデルの Entry を公開すると、ここに実レスポンスが表示されます。",
    "api.responseSample": "レスポンス例",
    "webhook.eyebrow": "Webhook",
    "webhook.title": "配信イベントを外部へ通知",
    "webhook.name": "Webhook 名",
    "webhook.url": "送信先 URL",
    "webhook.events": "購読イベント",
    "webhook.create": "Webhook を追加",
    "webhook.test": "テスト送信",
    "webhook.neverDelivered": "未送信",
    "webhook.noHooksTitle": "Webhook はまだありません",
    "webhook.noHooksMessage": "公開や更新イベントを外部サービスへ送る場合は、最初の Webhook を登録してください。",
    "webhook.event.entryPublished": "エントリー公開",
    "webhook.event.entryUpdated": "エントリー更新",
    "webhook.event.entryDeleted": "エントリー削除",
    "webhook.event.mediaUpdated": "メディア更新",
    "webhook.event.modelUpdated": "モデル更新",
    "webhook.status.active": "有効",
    "webhook.status.paused": "停止中",
    "project.eyebrow": "プロジェクト",
    "project.title": "参加中プロジェクトと招待を管理",
    "project.description": "複数プロジェクトを横断しながら、現在の作業先を切り替えたり、新しいメンバーを招待できます。",
    "project.currentEyebrow": "現在のワークスペース",
    "project.currentDescriptionFallback": "まだ説明はありません。切り替えたプロジェクトのモデル・エントリー・API 設定が右側に反映されます。",
    "project.active": "現在選択中",
    "project.switch": "切り替え",
    "project.none": "参加中プロジェクトはありません",
    "project.invitesEyebrow": "招待",
    "project.invitesTitle": "現在プロジェクトの招待を送る",
    "project.inviteEmail": "招待先メールアドレス",
    "project.inviteRole": "ロール",
    "project.inviteAction": "招待を送る",
    "project.revokeInvite": "招待を取り消す",
    "project.noInvitesTitle": "送信済み招待はありません",
    "project.noInvitesMessage": "チームメンバーを招待すると、このプロジェクトに参加できるようになります。",
    "project.createEyebrow": "新規プロジェクト",
    "project.createTitle": "新しいプロジェクトを追加",
    "project.name": "プロジェクト名",
    "project.slug": "スラッグ",
    "project.descriptionLabel": "説明",
    "project.createAction": "プロジェクトを作成",
    "project.pendingEyebrow": "参加待ち",
    "project.pendingTitle": "あなた宛ての招待",
    "project.invitedWorkspace": "招待されたワークスペース",
    "project.acceptInvite": "この招待を承認",
    "project.noPendingTitle": "承認待ちの招待はありません",
    "project.noPendingMessage": "他アカウントから招待されると、ここに参加待ちのプロジェクトが表示されます。",
    "project.loading": "プロジェクト情報を読み込み中です...",
    "project.role.owner": "オーナー",
    "project.role.admin": "管理者",
    "project.role.editor": "編集者",
    "project.role.viewer": "閲覧者",
    "project.inviteStatus.pending": "送信済み",
    "project.inviteStatus.accepted": "参加済み",
    "project.inviteStatus.revoked": "取り消し済み",
    "modelForm.name": "モデル名",
    "modelForm.apiId": "API ID",
    "modelForm.description": "説明",
    "modelForm.status": "ステータス",
    "modelForm.summary": "概要",
    "modelForm.apiPath": "API パス",
    "modelForm.visibleColumns": "一覧表示カラム",
    "modelForm.cancel": "キャンセル",
    "modelForm.create": "モデルを作成",
    "modelForm.save": "モデルを保存",
    "modelField.title": "フィールド定義",
    "modelField.subtitle": "スキーマを一度定義すると、エントリーフォームはここから生成されます。",
    "modelField.add": "フィールド追加",
    "modelField.label": "ラベル",
    "modelField.type": "フィールド型",
    "modelField.key": "キー",
    "modelField.apiKey": "API キー",
    "modelField.description": "説明",
    "modelField.referenceModel": "参照モデル",
    "modelField.anyModel": "すべてのモデル",
    "modelField.moveUp": "上へ",
    "modelField.moveDown": "下へ",
    "modelField.remove": "削除",
    "modelField.required": "必須",
    "modelField.unique": "一意",
    "modelField.titleField": "タイトル項目",
    "modelField.showInList": "一覧に表示",
    "modelField.validation": "バリデーション",
    "modelField.outputPreview": "出力プレビュー",
    "modelField.item": ({ index: index2 }) => `フィールド ${index2}`,
    "modelField.noFieldsTitle": "フィールドがありません",
    "modelField.noFieldsMessage": "最初のフィールドを追加して、エントリー作成・検証・API 出力の基準を決めてください。",
    "entryForm.model": "コンテンツモデル",
    "entryForm.title": "タイトル",
    "entryForm.slug": "slug",
    "entryForm.status": "ステータス",
    "entryForm.dynamicFields": "動的フィールド",
    "entryForm.publishPreview": "公開プレビュー",
    "entryForm.deliveryPath": "Delivery パス",
    "entryForm.boundFields": "選択モデルに紐づくフィールド数",
    "entryForm.cancel": "キャンセル",
    "entryForm.create": "エントリーを作成",
    "entryForm.save": "エントリーを保存",
    "entryField.selectMedia": "メディアを選択",
    "entryField.selectEntry": "エントリーを選択",
    "entryField.enable": "このエントリーで有効にする",
    "mediaForm.fileName": "ファイル名",
    "mediaForm.url": "モック URL",
    "mediaForm.mime": "MIME type",
    "mediaForm.size": "サイズ（bytes）",
    "mediaForm.alt": "alt テキスト",
    "mediaForm.description": "説明",
    "mediaForm.tags": "タグ",
    "mediaForm.uploadMode": "アップロード方式",
    "mediaForm.uploadModeBody": "この MVP では実ファイルではなくメタデータのみを保持します。フォーム入力からメディアレコードを疑似生成します。",
    "mediaForm.resolvedUrl": "解決後 URL",
    "mediaForm.noTags": "タグなし",
    "mediaForm.cancel": "キャンセル",
    "mediaForm.create": "メディアを登録",
    "mediaForm.save": "メディアを保存",
    "empty.any": "現在データはありません",
    "actions.openModels": "モデル一覧",
    "actions.openEntries": "エントリー一覧",
    "actions.viewAll": "すべて表示",
    "error.badRequestTitle": "400 Bad Request",
    "error.badRequestMessage": "入力内容またはリクエスト形式に問題があります。トップへ戻って、内容を見直してください。",
    "error.genericTitle": "画面を表示できません",
    "error.genericMessage": "予期しないエラーが発生しました。トップへ戻って再度お試しください。",
    "error.backToTop": "TOP に戻る",
    "error.modelNotFound": "モデルが見つかりません",
    "error.entryNotFound": "エントリーが見つかりません",
    "error.mediaNotFound": "メディアが見つかりません"
  },
  en: {
    "lang.ja": "Japanese",
    "lang.en": "English",
    "nav.dashboard": "Dashboard",
    "nav.projects": "Projects",
    "nav.models": "Content Models",
    "nav.entries": "Entries",
    "nav.media": "Media",
    "nav.api": "API Settings",
    "sidebar.title": "Control your content schema and delivery from one admin surface.",
    "sidebar.description": "Built with flat lists, fast edits, and mock APIs that can later map cleanly to a headless CMS backend.",
    "sidebar.currentProject": "Current project",
    "sidebar.noProject": "No project selected",
    "sidebar.projectDescriptionFallback": "Switch projects here to move models, entries, and webhook settings together.",
    "sidebar.switchProject": "Switch project",
    "sidebar.pendingInvites": "invites",
    "sidebar.signedInAs": "Signed in as",
    "sidebar.guestName": "No session",
    "sidebar.guestEmail": "Sign in to continue",
    "sidebar.manageProjects": "Manage projects",
    "sidebar.contactSupport": "Support",
    "sidebar.postureTitle": "MVP posture",
    "sidebar.postureBody": "Mock data first. Keep the UI API-ready and avoid card-heavy clutter.",
    "sidebar.language": "Language",
    "public.top": "TOP",
    "public.login": "Login",
    "public.contact": "Contact",
    "public.language": "Language",
    "common.refresh": "Refresh",
    "common.refreshSnapshot": "Refresh snapshot",
    "common.search": "Search",
    "common.total": "Total",
    "common.status": "Status",
    "common.updated": "Updated",
    "common.created": "Created",
    "common.fields": "Fields",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.save": "Save",
    "common.register": "Register",
    "common.generate": "Generate",
    "common.invalidate": "Invalidate",
    "common.loadingDashboard": "Loading dashboard snapshot...",
    "common.yes": "Yes",
    "common.no": "No",
    "common.allModels": "All models",
    "reload.title": "Reloading",
    "reload.message": "The wave dots are up while the app swaps to the latest project state.",
    "auth.title": "Manage content operations across multiple projects from one sign-in.",
    "auth.description": "The login flow now covers invites, project switching, and webhook setup from the same workspace.",
    "auth.demoTitle": "Demo access",
    "auth.demoMessage": "Pick one of the demo accounts below or enter an email and use the shared password.",
    "auth.signInEyebrow": "Sign in",
    "auth.signInTitle": "Enter the workspace",
    "auth.signInDescription": "The current session and selected project persist, and you can switch projects anytime from the sidebar.",
    "auth.email": "Email address",
    "auth.password": "Password",
    "auth.submit": "Sign in",
    "auth.loginFailed": "Sign-in failed. Check the email address and password.",
    "auth.logout": "Log out",
    "contact.publicEyebrow": "Contact",
    "contact.publicTitle": "You can reach out before signing in.",
    "contact.publicDescription": "Use this page for demos, pricing questions, or rollout planning before you have a workspace session. If you are already signed in, use the in-product support route instead.",
    "contact.memberShortcut": "Open signed-in support",
    "contact.memberEyebrow": "Support",
    "contact.memberTitle": "Send support requests with your current workspace context.",
    "contact.memberDescription": "This route attaches the signed-in user and active project to the message so operational questions and bug reports arrive with enough context.",
    "contact.formTitle": "Prepare your message",
    "contact.formDescriptionPublic": "Before sign-in, add your contact details here. The button opens your mail client with a prepared subject and body.",
    "contact.formDescriptionMember": "Signed-in support includes the current account details and active project name in the drafted email.",
    "contact.targetLabel": "Destination",
    "contact.targetHint": "The button opens your default mail client and pre-fills the subject and message body.",
    "contact.contextUser": "User",
    "contact.contextEmail": "Reply email",
    "contact.contextProject": "Current project",
    "contact.contextFlow": "Request flow",
    "contact.contextFlowPublic": "Pre-login inquiry",
    "contact.contextReply": "Reply target",
    "contact.contextReplyPending": "Appears after you enter an email address",
    "contact.projectFallback": "No project selected",
    "contact.company": "Company",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.topic": "Request type",
    "contact.message": "Message",
    "contact.messagePlaceholderPublic": "Describe your use case, what you need to confirm, and any rollout timeline.",
    "contact.messagePlaceholderMember": "Describe the issue, expected behavior, or the operational help you need.",
    "contact.responseTitle": "What happens next",
    "contact.responseBodyPublic": "Public inquiries include your company and reply address in the drafted message.",
    "contact.responseBodyMember": "Signed-in support includes your user details and current project in the drafted message.",
    "contact.openPublicMail": "Draft inquiry email",
    "contact.openMemberMail": "Draft support email",
    "contact.missingPublic": "Enter your name, email, and message to continue.",
    "contact.missingMember": "Wait for the session details and add your message to continue.",
    "contact.topic.sales": "Sales inquiry",
    "contact.topic.demo": "Demo request",
    "contact.topic.pricing": "Pricing and contract",
    "contact.topic.general": "General question",
    "contact.topic.bug": "Bug report",
    "contact.topic.feature": "Feature request",
    "contact.topic.account": "Account support",
    "contact.topic.operations": "Operational support",
    "fieldType.text": "Text",
    "fieldType.textarea": "Textarea",
    "fieldType.richText": "Rich Text",
    "fieldType.number": "Number",
    "fieldType.boolean": "Boolean",
    "fieldType.date": "Date",
    "fieldType.json": "JSON",
    "fieldType.media": "Media",
    "fieldType.reference": "Reference",
    "status.active": "Active",
    "status.draft": "Draft",
    "status.published": "Published",
    "status.revoked": "Revoked",
    "token.delivery": "Delivery API",
    "token.management": "Management API",
    "confirm.deleteModel": ({ name }) => `Delete model "${name}"?`,
    "confirm.deleteEntry": ({ name }) => `Delete entry "${name}"?`,
    "confirm.deleteMedia": ({ name }) => `Delete media "${name}"?`,
    "confirm.invalidateToken": ({ name }) => `Invalidate token "${name}"?`,
    "confirm.revokeInvite": ({ email }) => `Revoke invite "${email}"?`,
    "confirm.deleteWebhook": ({ name }) => `Delete webhook "${name}"?`,
    "dashboard.eyebrow": "Overview",
    "dashboard.title": "Content operations at a glance",
    "dashboard.description": "Conteful keeps schema design, entry editing, media handling, and API exposure in one flat flow.",
    "dashboard.metricModels": "Content Models",
    "dashboard.metricModelsCaption": "Schemas that define entry creation and delivery API structure.",
    "dashboard.metricEntries": "Entries",
    "dashboard.metricEntriesCaption": "Draft or published content items generated from active models.",
    "dashboard.metricMedia": "Media",
    "dashboard.metricMediaCaption": "Metadata-first assets that can be referenced from entry fields.",
    "dashboard.quickActions": "Quick actions",
    "dashboard.quickActionModel": "Create a content model",
    "dashboard.quickActionModelNote": "Define fields, validation, and API keys.",
    "dashboard.quickActionEntry": "Create an entry",
    "dashboard.quickActionEntryNote": "Generate a form from the selected model definition.",
    "dashboard.quickActionMedia": "Register media",
    "dashboard.quickActionMediaNote": "Simulate upload flows with mock URLs and metadata.",
    "dashboard.recentModelsEyebrow": "Recently updated models",
    "dashboard.recentModelsTitle": "Schema changes",
    "dashboard.recentEntriesEyebrow": "Recently updated entries",
    "dashboard.recentEntriesTitle": "Content activity",
    "dashboard.latestMediaEyebrow": "Latest media",
    "dashboard.noModelsTitle": "No models yet",
    "dashboard.noModelsMessage": "Start by defining a content model. Entry forms and delivery APIs derive from it.",
    "dashboard.noEntriesTitle": "No entries yet",
    "dashboard.noEntriesMessage": "Create an entry from one of your models to see publish state and API structure here.",
    "dashboard.noMediaTitle": "No media yet",
    "dashboard.noMediaMessage": "Add a media item to make `media` fields selectable inside entries.",
    "models.index.eyebrow": "Content Models",
    "models.index.title": "Manage content schema definitions",
    "models.index.description": "Each model defines the fields, validation, and delivery shape that entries will follow.",
    "models.index.searchLabel": "Search models",
    "models.index.searchPlaceholder": "Search by model name, api id, description",
    "models.index.new": "New model",
    "models.index.noResultsTitle": "No matching models",
    "models.index.noResultsMessage": "Try a broader query or create the first content model for the workspace.",
    "models.new.eyebrow": "Content Models",
    "models.new.title": "Create a new model",
    "models.new.description": "Define fields once, then reuse the structure across listing, detail, and delivery API flows.",
    "models.detail.eyebrow": "Content Models",
    "models.detail.descriptionFallback": "Edit field definitions, list behavior, and API output settings.",
    "models.detail.delete": "Delete model",
    "models.detail.snapshot": "Model snapshot",
    "models.detail.apiPath": "API path",
    "models.detail.entriesUsing": "Entries using this model",
    "models.detail.relatedEntriesEyebrow": "Related entries",
    "models.detail.relatedEntriesTitle": "Latest content using this model",
    "models.detail.newEntry": "New entry",
    "models.detail.noEntriesTitle": "No entries yet",
    "models.detail.noEntriesMessage": "This model is ready, but no entry has been created from it yet.",
    "entries.index.eyebrow": "Entries",
    "entries.index.title": "Manage content items",
    "entries.index.description": "Entries are generated from model definitions, then saved as draft or published content with delivery-ready metadata.",
    "entries.index.searchLabel": "Search entries",
    "entries.index.searchPlaceholder": "Search by title, slug, status",
    "entries.index.new": "New entry",
    "entries.index.noResultsTitle": "No matching entries",
    "entries.index.noResultsMessage": "Broaden the query or create a new entry.",
    "entries.new.eyebrow": "Entries",
    "entries.new.title": "Create a new entry",
    "entries.new.description": "Select a model and Conteful will generate the input form from its field definition.",
    "entries.detail.eyebrow": "Entries",
    "entries.detail.updatedPrefix": "Last updated",
    "entries.detail.delete": "Delete entry",
    "media.index.eyebrow": "Media",
    "media.index.title": "Manage registered assets",
    "media.index.description": "The MVP stores media metadata only, but keeps the structure ready for a real storage backend and CDN later.",
    "media.index.new": "Register media",
    "media.index.searchLabel": "Search media",
    "media.index.searchPlaceholder": "Search by file name, MIME type, alt, tags",
    "media.index.tagFilterLabel": "Filter by tag",
    "media.index.allTags": "All tags",
    "media.index.columnMedia": "Media",
    "media.index.thumb": "Thumb",
    "media.index.noResultsTitle": "No matching media",
    "media.index.noResultsMessage": "Add a media item or broaden the query to see all registered assets.",
    "media.new.eyebrow": "Media",
    "media.new.title": "Register a media item",
    "media.new.description": "This MVP simulates upload success by storing file metadata and a mock URL that can be linked from entries.",
    "media.detail.eyebrow": "Media",
    "media.detail.updatedPrefix": "Last updated",
    "media.detail.delete": "Delete media",
    "media.detail.snapshot": "Media snapshot",
    "media.detail.mime": "MIME type",
    "media.detail.size": "Size",
    "media.detail.url": "URL",
    "media.detail.created": "Created",
    "api.eyebrow": "API Settings",
    "api.title": "Prepare admin and delivery access",
    "api.description": "Token management is mocked for the MVP, but the endpoint split and response shapes are ready for a real API boundary.",
    "api.tokenManagement": "Token management",
    "api.tokenTitle": "Public and management tokens",
    "api.tokenName": "Token name",
    "api.kind": "Kind",
    "api.noTokensTitle": "No tokens yet",
    "api.noTokensMessage": "Generate a mock delivery or management token to document how future authentication will be introduced.",
    "api.baseUrl": "Base URL",
    "api.activeProject": ({ name }) => `Current project: ${name}`,
    "api.endpoints": "Endpoint examples",
    "api.previewEyebrow": "Delivery Preview",
    "api.previewTitle": "Inspect live delivery responses",
    "api.previewModelLabel": "Model",
    "api.previewSearchLabel": "Search published entries",
    "api.previewSearchPlaceholder": "Search by title or slug",
    "api.previewAction": "Refresh preview",
    "api.previewEndpoint": "Preview endpoint",
    "api.previewPublishedCount": "Published total",
    "api.previewProjectScope": "Project scope",
    "api.previewListTitle": "Published entries",
    "api.previewResponseTitle": "Live response",
    "api.previewLoading": "Loading Delivery API preview...",
    "api.previewNoModelsTitle": "No models available for preview",
    "api.previewNoModelsMessage": "Create a content model first to inspect the delivery response here.",
    "api.previewNoEntriesTitle": "No published entries yet",
    "api.previewNoEntriesMessage": "Publish an entry for the selected model to see the live response here.",
    "api.responseSample": "Response sample",
    "webhook.eyebrow": "Webhook",
    "webhook.title": "Notify external services on publish events",
    "webhook.name": "Webhook name",
    "webhook.url": "Destination URL",
    "webhook.events": "Subscribed events",
    "webhook.create": "Add webhook",
    "webhook.test": "Send test",
    "webhook.neverDelivered": "Never delivered",
    "webhook.noHooksTitle": "No webhooks yet",
    "webhook.noHooksMessage": "Register the first webhook when publish and update events need to reach an external service.",
    "webhook.event.entryPublished": "Entry published",
    "webhook.event.entryUpdated": "Entry updated",
    "webhook.event.entryDeleted": "Entry deleted",
    "webhook.event.mediaUpdated": "Media updated",
    "webhook.event.modelUpdated": "Model updated",
    "webhook.status.active": "Active",
    "webhook.status.paused": "Paused",
    "project.eyebrow": "Projects",
    "project.title": "Manage joined projects and invitations",
    "project.description": "Switch between multiple projects, invite teammates, and keep the current workspace obvious from one place.",
    "project.currentEyebrow": "Current workspace",
    "project.currentDescriptionFallback": "No description yet. The active project drives the models, entries, and API settings shown across the app.",
    "project.active": "Active now",
    "project.switch": "Switch",
    "project.none": "No joined projects yet",
    "project.invitesEyebrow": "Invites",
    "project.invitesTitle": "Send invites for the current project",
    "project.inviteEmail": "Invite email",
    "project.inviteRole": "Role",
    "project.inviteAction": "Send invite",
    "project.revokeInvite": "Revoke invite",
    "project.noInvitesTitle": "No sent invites",
    "project.noInvitesMessage": "Invite teammates here to let them join the current project.",
    "project.createEyebrow": "New project",
    "project.createTitle": "Add a fresh project",
    "project.name": "Project name",
    "project.slug": "Slug",
    "project.descriptionLabel": "Description",
    "project.createAction": "Create project",
    "project.pendingEyebrow": "Pending access",
    "project.pendingTitle": "Invites for you",
    "project.invitedWorkspace": "Invited workspace",
    "project.acceptInvite": "Accept this invite",
    "project.noPendingTitle": "No pending invites",
    "project.noPendingMessage": "When another account invites you, the project will appear here for approval.",
    "project.loading": "Loading project data...",
    "project.role.owner": "Owner",
    "project.role.admin": "Admin",
    "project.role.editor": "Editor",
    "project.role.viewer": "Viewer",
    "project.inviteStatus.pending": "Pending",
    "project.inviteStatus.accepted": "Accepted",
    "project.inviteStatus.revoked": "Revoked",
    "modelForm.name": "Model name",
    "modelForm.apiId": "API ID",
    "modelForm.description": "Description",
    "modelForm.status": "Status",
    "modelForm.summary": "Summary",
    "modelForm.apiPath": "API path",
    "modelForm.visibleColumns": "Visible list columns",
    "modelForm.cancel": "Cancel",
    "modelForm.create": "Create model",
    "modelForm.save": "Save model",
    "modelField.title": "Field Definition",
    "modelField.subtitle": "Create the schema once. Entry forms are generated from this list.",
    "modelField.add": "Add field",
    "modelField.label": "Label",
    "modelField.type": "Field type",
    "modelField.key": "Key",
    "modelField.apiKey": "API key",
    "modelField.description": "Description",
    "modelField.referenceModel": "Reference model",
    "modelField.anyModel": "Any model",
    "modelField.moveUp": "Up",
    "modelField.moveDown": "Down",
    "modelField.remove": "Remove",
    "modelField.required": "Required",
    "modelField.unique": "Unique",
    "modelField.titleField": "Title field",
    "modelField.showInList": "Show in list",
    "modelField.validation": "Validation rules",
    "modelField.outputPreview": "Output preview",
    "modelField.item": ({ index: index2 }) => `Field ${index2}`,
    "modelField.noFieldsTitle": "No fields yet",
    "modelField.noFieldsMessage": "Add the first field to define how entries are created, validated, and exposed through the API.",
    "entryForm.model": "Content model",
    "entryForm.title": "Title",
    "entryForm.slug": "Slug",
    "entryForm.status": "Status",
    "entryForm.dynamicFields": "Dynamic fields",
    "entryForm.publishPreview": "Publish preview",
    "entryForm.deliveryPath": "Delivery path",
    "entryForm.boundFields": "Fields bound to the selected model",
    "entryForm.cancel": "Cancel",
    "entryForm.create": "Create entry",
    "entryForm.save": "Save entry",
    "entryField.selectMedia": "Select media",
    "entryField.selectEntry": "Select entry",
    "entryField.enable": "Enable for this entry",
    "mediaForm.fileName": "File name",
    "mediaForm.url": "Mock URL",
    "mediaForm.mime": "MIME type",
    "mediaForm.size": "Size (bytes)",
    "mediaForm.alt": "Alt text",
    "mediaForm.description": "Description",
    "mediaForm.tags": "Tags",
    "mediaForm.uploadMode": "Upload mode",
    "mediaForm.uploadModeBody": "This MVP stores metadata only. A media record is simulated from the form values instead of a real upload.",
    "mediaForm.resolvedUrl": "Resolved URL",
    "mediaForm.noTags": "No tags",
    "mediaForm.cancel": "Cancel",
    "mediaForm.create": "Register media",
    "mediaForm.save": "Save media",
    "empty.any": "No data available.",
    "actions.openModels": "Open models",
    "actions.openEntries": "Open entries",
    "actions.viewAll": "View all",
    "error.badRequestTitle": "400 Bad Request",
    "error.badRequestMessage": "There is a problem with the request or input. Return to the top page and review it.",
    "error.genericTitle": "Unable to render this view",
    "error.genericMessage": "An unexpected error occurred. Return to the top page and try again.",
    "error.backToTop": "Back to TOP",
    "error.modelNotFound": "Model not found",
    "error.entryNotFound": "Entry not found",
    "error.mediaNotFound": "Media item not found"
  }
};
function interpolate(template, params) {
  if (!params) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
}
function useLocale() {
  const locale = useCookie("conteful-locale", {
    default: () => "ja",
    sameSite: "lax"
  });
  const locales = [
    { value: "ja", labelKey: "lang.ja" },
    { value: "en", labelKey: "lang.en" }
  ];
  function setLocale(next) {
    locale.value = next;
  }
  function t(key, params) {
    const pack = messages[locale.value] ?? messages.ja;
    const fallback = messages.en[key] ?? key;
    const value = pack[key] ?? fallback;
    if (typeof value === "function") {
      return value(params);
    }
    return interpolate(value, params);
  }
  return {
    locale,
    locales,
    setLocale,
    t
  };
}
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "LocaleDock",
  __ssrInlineRender: true,
  props: {
    mode: { default: "dock" }
  },
  setup(__props) {
    const props = __props;
    const { locale, locales, t } = useLocale();
    const menuRef = ref(null);
    const menuOpen = ref(false);
    const currentLocale = computed(() => {
      return locales.find((item) => item.value === locale.value) ?? locales[0];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      if (props.mode === "dock") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "locale-dock" }, _attrs))}><div class="hard-panel locale-dock-panel flex items-center gap-2 px-3 py-3"><span class="hidden text-xs font-semibold uppercase tracking-[0.2em] text-black/38 md:block">${ssrInterpolate(unref(t)("public.language"))}</span><!--[-->`);
        ssrRenderList(unref(locales), (item) => {
          _push(`<button type="button" class="action-button px-3 py-2 text-sm"${ssrRenderAttr("data-variant", unref(locale) === item.value ? "solid" : void 0)}>${ssrInterpolate(unref(t)(item.labelKey))}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          ref_key: "menuRef",
          ref: menuRef,
          class: "locale-menu"
        }, _attrs))}><button type="button" class="action-button locale-menu-trigger px-4 py-3 text-sm" aria-haspopup="menu"${ssrRenderAttr("aria-expanded", String(unref(menuOpen)))}${ssrRenderAttr("data-open", unref(menuOpen) ? "true" : void 0)}><span class="locale-menu-meta"><span class="locale-menu-label">${ssrInterpolate(unref(t)("sidebar.language"))}</span><span class="locale-menu-value">${ssrInterpolate(unref(t)(unref(currentLocale).labelKey))}</span></span>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:chevrons-up-down",
          size: "16",
          class: "locale-menu-icon"
        }, null, _parent));
        _push(`</button>`);
        if (unref(menuOpen)) {
          _push(`<div class="hard-panel locale-menu-panel" role="menu"><!--[-->`);
          ssrRenderList(unref(locales), (item) => {
            _push(`<button type="button" class="locale-menu-item" role="menuitemradio"${ssrRenderAttr("aria-checked", unref(locale) === item.value)}${ssrRenderAttr("data-active", unref(locale) === item.value ? "true" : void 0)}><span class="font-medium">${ssrInterpolate(unref(t)(item.labelKey))}</span>`);
            if (unref(locale) === item.value) {
              _push(ssrRenderComponent(_component_Icon, {
                name: "lucide:check",
                size: "16"
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LocaleDock.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$5, { __name: "LocaleDock" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ReloadScreen",
  __ssrInlineRender: true,
  props: {
    active: { type: Boolean },
    label: {},
    message: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const resolvedLabel = computed(() => props.label || t("reload.title"));
    const resolvedMessage = computed(() => props.message || t("reload.message"));
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.active) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "reload-overlay px-4" }, _attrs))}><div class="reload-card px-8 py-9 text-center"><p class="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-black/42"> Conteful </p><div class="mt-6 flex justify-center"><div class="wave-dots" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div></div><h2 class="mt-6 text-2xl font-semibold tracking-[-0.05em]">${ssrInterpolate(unref(resolvedLabel))}</h2><p class="mt-3 text-sm leading-6 text-black/58">${ssrInterpolate(unref(resolvedMessage))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ReloadScreen.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0$2 = Object.assign(_sfc_main$4, { __name: "ReloadScreen" });
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init2] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init2 !== void 0 && typeof init2 !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init2);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init2) {
    const initialValue = init2();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useReloadOverlay() {
  const active = useState("conteful-reload-active", () => false);
  const label = useState("conteful-reload-label", () => "");
  const message = useState("conteful-reload-message", () => "");
  function show(options = {}) {
    active.value = true;
    label.value = options.label || "";
    message.value = options.message || "";
  }
  function hide() {
    active.value = false;
    label.value = "";
    message.value = "";
  }
  async function run(task, options = {}) {
    show(options);
    try {
      return await task();
    } finally {
      hide();
    }
  }
  return {
    active,
    label,
    message,
    show,
    hide,
    run
  };
}
async function request(path, getProjectId, options) {
  const headers = new Headers(options?.headers);
  const projectId = getProjectId?.();
  if (projectId) {
    headers.set("x-conteful-project-id", projectId);
  }
  return $fetch(path, {
    ...options,
    headers
  });
}
function createAdminRepository(getProjectId) {
  return {
    getSession() {
      return request("/api/v1/auth/session", getProjectId);
    },
    getDashboard() {
      return request("/api/v1/admin/dashboard", getProjectId);
    },
    login(payload) {
      return request("/api/v1/auth/login", getProjectId, {
        method: "POST",
        body: payload
      });
    },
    logout() {
      return request("/api/v1/auth/logout", getProjectId, {
        method: "POST"
      });
    },
    listProjects() {
      return request("/api/v1/admin/projects", getProjectId);
    },
    getProject(id) {
      return request(`/api/v1/admin/projects/${id}`, getProjectId);
    },
    createProject(payload) {
      return request("/api/v1/admin/projects", getProjectId, {
        method: "POST",
        body: payload
      });
    },
    switchProject(id) {
      return request(`/api/v1/admin/projects/${id}/switch`, getProjectId, {
        method: "POST"
      });
    },
    listInvites() {
      return request("/api/v1/admin/invites", getProjectId);
    },
    createInvite(payload) {
      return request("/api/v1/admin/invites", getProjectId, {
        method: "POST",
        body: payload
      });
    },
    revokeInvite(id) {
      return request(`/api/v1/admin/invites/${id}`, getProjectId, {
        method: "DELETE"
      });
    },
    acceptInvite(token) {
      return request(`/api/v1/invites/${token}/accept`, getProjectId, {
        method: "POST"
      });
    },
    listWebhooks() {
      return request("/api/v1/admin/webhooks", getProjectId);
    },
    createWebhook(payload) {
      return request("/api/v1/admin/webhooks", getProjectId, {
        method: "POST",
        body: payload
      });
    },
    updateWebhook(id, payload) {
      return request(`/api/v1/admin/webhooks/${id}`, getProjectId, {
        method: "PATCH",
        body: payload
      });
    },
    deleteWebhook(id) {
      return request(`/api/v1/admin/webhooks/${id}`, getProjectId, {
        method: "DELETE"
      });
    },
    testWebhook(id) {
      return request(`/api/v1/admin/webhooks/${id}/deliver`, getProjectId, {
        method: "POST"
      });
    },
    listModels() {
      return request("/api/v1/admin/models", getProjectId);
    },
    getModel(id) {
      return request(`/api/v1/admin/models/${id}`, getProjectId);
    },
    createModel(payload) {
      return request("/api/v1/admin/models", getProjectId, {
        method: "POST",
        body: payload
      });
    },
    updateModel(id, payload) {
      return request(`/api/v1/admin/models/${id}`, getProjectId, {
        method: "PATCH",
        body: payload
      });
    },
    deleteModel(id) {
      return request(`/api/v1/admin/models/${id}`, getProjectId, {
        method: "DELETE"
      });
    },
    listEntries(modelId) {
      return request("/api/v1/admin/entries", getProjectId, {
        query: modelId ? { modelId } : void 0
      });
    },
    getEntry(id) {
      return request(`/api/v1/admin/entries/${id}`, getProjectId);
    },
    createEntry(payload) {
      return request("/api/v1/admin/entries", getProjectId, {
        method: "POST",
        body: payload
      });
    },
    updateEntry(id, payload) {
      return request(`/api/v1/admin/entries/${id}`, getProjectId, {
        method: "PATCH",
        body: payload
      });
    },
    deleteEntry(id) {
      return request(`/api/v1/admin/entries/${id}`, getProjectId, {
        method: "DELETE"
      });
    },
    listMedia() {
      return request("/api/v1/admin/media", getProjectId);
    },
    getMedia(id) {
      return request(`/api/v1/admin/media/${id}`, getProjectId);
    },
    createMedia(payload) {
      return request("/api/v1/admin/media", getProjectId, {
        method: "POST",
        body: payload
      });
    },
    updateMedia(id, payload) {
      return request(`/api/v1/admin/media/${id}`, getProjectId, {
        method: "PATCH",
        body: payload
      });
    },
    deleteMedia(id) {
      return request(`/api/v1/admin/media/${id}`, getProjectId, {
        method: "DELETE"
      });
    },
    listTokens() {
      return request("/api/v1/admin/tokens", getProjectId);
    },
    createToken(payload) {
      return request("/api/v1/admin/tokens", getProjectId, {
        method: "POST",
        body: payload
      });
    },
    invalidateToken(id) {
      return request(`/api/v1/admin/tokens/${id}`, getProjectId, {
        method: "DELETE"
      });
    }
  };
}
function normalizeSessionCookie(session, sessionIdCookie, projectIdCookie) {
  sessionIdCookie.value = session?.sessionId || null;
  projectIdCookie.value = session?.activeProject?.id || null;
}
function useWorkspaceSession() {
  const session = useState("conteful-session", () => null);
  const ready = useState("conteful-session-ready", () => false);
  const sessionIdCookie = useCookie("conteful-session-id", {
    sameSite: "lax"
  });
  const projectIdCookie = useCookie("conteful-project-id", {
    sameSite: "lax"
  });
  const adminRepository = createAdminRepository(() => projectIdCookie.value);
  const { run } = useReloadOverlay();
  const activeProject = computed(() => session.value?.activeProject || null);
  const availableProjects = computed(() => session.value?.projects || []);
  const pendingInvites = computed(() => session.value?.pendingInvites || []);
  const isAuthenticated = computed(() => Boolean(session.value?.sessionId));
  async function refreshSession() {
    try {
      const response = await adminRepository.getSession();
      session.value = response.item;
      normalizeSessionCookie(response.item, sessionIdCookie, projectIdCookie);
      return response.item;
    } catch {
      session.value = null;
      normalizeSessionCookie(null, sessionIdCookie, projectIdCookie);
      return null;
    } finally {
      ready.value = true;
    }
  }
  async function bootstrapSession() {
    if (ready.value) {
      return session.value;
    }
    return refreshSession();
  }
  async function login(email, password) {
    const response = await run(() => adminRepository.login({ email, password }));
    session.value = response.item;
    ready.value = true;
    normalizeSessionCookie(response.item, sessionIdCookie, projectIdCookie);
    await clearNuxtData();
    return response.item;
  }
  async function logout() {
    await run(() => adminRepository.logout());
    session.value = null;
    ready.value = true;
    normalizeSessionCookie(null, sessionIdCookie, projectIdCookie);
    clearNuxtData();
    await navigateTo("/login");
  }
  async function switchProject(projectId) {
    const response = await run(() => adminRepository.switchProject(projectId));
    session.value = response.item;
    ready.value = true;
    normalizeSessionCookie(response.item, sessionIdCookie, projectIdCookie);
    clearNuxtData();
    await refreshNuxtData();
    await navigateTo("/", { replace: true });
    return response.item;
  }
  async function acceptInvite(token) {
    const response = await run(() => adminRepository.acceptInvite(token));
    session.value = response.item;
    ready.value = true;
    normalizeSessionCookie(response.item, sessionIdCookie, projectIdCookie);
    clearNuxtData();
    await refreshNuxtData();
    return response.item;
  }
  return {
    session,
    ready,
    activeProject,
    availableProjects,
    pendingInvites,
    isAuthenticated,
    bootstrapSession,
    refreshSession,
    login,
    logout,
    switchProject,
    acceptInvite
  };
}
async function callOnce(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, fn, options] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [callOnce] key must be a string: " + _key);
  }
  if (fn !== void 0 && typeof fn !== "function") {
    throw new Error("[nuxt] [callOnce] fn must be a function: " + fn);
  }
  const nuxtApp = useNuxtApp();
  if (options?.mode === "navigation") {
    let callback = function() {
      nuxtApp.payload.once.delete(_key);
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
    const cleanups = [];
    cleanups.push(nuxtApp.hooks.hook("page:start", callback), useRouter().beforeResolve(callback));
  }
  if (nuxtApp.payload.once.has(_key)) {
    {
      return;
    }
  }
  nuxtApp._once ||= {};
  nuxtApp._once[_key] ||= fn() || true;
  await nuxtApp._once[_key];
  nuxtApp.payload.once.add(_key);
  delete nuxtApp._once[_key];
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { locale } = useLocale();
    const { active, label, message } = useReloadOverlay();
    const { bootstrapSession, isAuthenticated } = useWorkspaceSession();
    useNuxtApp();
    [__temp, __restore] = withAsyncContext(() => callOnce(
      "workspace-session",
      () => bootstrapSession(),
      "$JTSFU1J4-8"
      /* nuxt-injected */
    )), await __temp, __restore();
    useHead(() => ({
      htmlAttrs: {
        lang: locale.value
      }
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$3;
      const _component_NuxtPage = __nuxt_component_1$2;
      const _component_LocaleDock = __nuxt_component_1;
      const _component_ReloadScreen = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-shell" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!unref(isAuthenticated)) {
        _push(ssrRenderComponent(_component_LocaleDock, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ReloadScreen, {
        active: unref(active),
        label: unref(label),
        message: unref(message)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, props.trailingSlash);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink?.({ ...props, to });
    const href = computed(() => {
      const effectiveTrailingSlash = props.trailingSlash ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return applyTrailingSlashBehavior(href2, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return router.resolve(to.value)?.href ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
      route: link?.route ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", {
          ref: el,
          href: href.value || null,
          // converts `""` to `null` to prevent the attribute from being added as empty (`href=""`)
          rel,
          target,
          onClick: async (event) => {
            if (isExternal.value || hasTarget.value) {
              return;
            }
            event.preventDefault();
            try {
              const encodedHref = encodeRoutePath(href.value);
              return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
            } finally {
            }
          }
        }, slots.default?.());
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const topHref = "/login";
const contactHref = "/contact";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PublicHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { t } = useLocale();
    function isActive(path) {
      return route.path === path;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "public-header px-4 py-4 md:px-6 lg:px-8" }, _attrs))}><div class="hard-panel public-header-bar mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-3 py-3 md:px-4"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: topHref,
        class: "action-button px-4 py-2 text-sm",
        "data-variant": isActive("/login") ? "solid" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("public.top"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("public.top")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "action-button px-4 py-2 text-sm",
        "data-variant": isActive("/login") ? "solid" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("public.login"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("public.login")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: contactHref,
        class: "action-button px-4 py-2 text-sm",
        "data-variant": isActive("/contact") ? "solid" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("public.contact"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("public.contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PublicHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "PublicHeader" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const sessionId = useCookie("conteful-session-id", {
      sameSite: "lax"
    });
    const showPublicHeader = computed(() => !sessionId.value);
    const statusCode = computed(() => props.error?.statusCode || props.error?.status || 500);
    const isBadRequest = computed(() => statusCode.value === 400);
    const title = computed(() => {
      if (isBadRequest.value) {
        return t("error.badRequestTitle");
      }
      return props.error?.statusMessage || t("error.genericTitle");
    });
    const description = computed(() => {
      if (isBadRequest.value) {
        return t("error.badRequestMessage");
      }
      return props.error?.message || t("error.genericMessage");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PublicHeader = __nuxt_component_0;
      const _component_LocaleDock = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-shell min-h-screen" }, _attrs))}>`);
      if (unref(showPublicHeader)) {
        _push(ssrRenderComponent(_component_PublicHeader, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-8"><div class="reload-card w-full max-w-2xl px-8 py-12 text-center md:px-12"><p class="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-black/42"> Conteful </p><p class="error-code mt-6 font-semibold text-black">${ssrInterpolate(unref(statusCode))}</p><h1 class="mt-5 text-3xl font-semibold tracking-[-0.05em] text-black">${ssrInterpolate(unref(title))}</h1><p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-black/58">${ssrInterpolate(unref(description))}</p><div class="mt-8 flex justify-center"><button class="action-button min-w-44" data-variant="solid" type="button">${ssrInterpolate(unref(t)("error.backToTop"))}</button></div></div></div>`);
      if (unref(showPublicHeader)) {
        _push(ssrRenderComponent(_component_LocaleDock, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));

export { __nuxt_component_1$1 as _, useWorkspaceSession as a, useReloadOverlay as b, createError as c, useAsyncData as d, entry_default as default, __nuxt_component_0$1 as e, __nuxt_component_0$2 as f, useRoute as g, useCookie as h, createAdminRepository as i, __nuxt_component_1 as j, __nuxt_component_0 as k, navigateTo as n, useLocale as u };
//# sourceMappingURL=server.mjs.map
