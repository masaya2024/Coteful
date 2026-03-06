import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getQuery as getQuery$1, readBody, getResponseStatus, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getRouterParam, getHeader, getCookie, setCookie, deleteCookie, getResponseStatusText } from 'file:///Users/hattori/Conteful/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///Users/hattori/Conteful/node_modules/@vue/shared/dist/shared.cjs.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///Users/hattori/Conteful/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file:///Users/hattori/Conteful/node_modules/ufo/dist/index.mjs';
import destr, { destr as destr$1 } from 'file:///Users/hattori/Conteful/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///Users/hattori/Conteful/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/hattori/Conteful/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/hattori/Conteful/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/hattori/Conteful/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/hattori/Conteful/node_modules/unstorage/drivers/fs.mjs';
import { digest, hash as hash$1 } from 'file:///Users/hattori/Conteful/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/hattori/Conteful/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/hattori/Conteful/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/hattori/Conteful/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/hattori/Conteful/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/hattori/Conteful/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///Users/hattori/Conteful/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/hattori/Conteful/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/hattori/Conteful/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/hattori/Conteful/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///Users/hattori/Conteful/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/hattori/Conteful/node_modules/errx/dist/index.js';
import { isVNode, isRef, toValue } from 'file:///Users/hattori/Conteful/node_modules/vue/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1, basename } from 'file:///Users/hattori/Conteful/node_modules/pathe/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///Users/hattori/Conteful/node_modules/unhead/dist/server.mjs';
import { renderToString } from 'file:///Users/hattori/Conteful/node_modules/vue/server-renderer/index.mjs';
import { walkResolver } from 'file:///Users/hattori/Conteful/node_modules/unhead/dist/utils.mjs';
import { getIcons } from 'file:///Users/hattori/Conteful/node_modules/@iconify/utils/lib/index.mjs';
import { collections } from 'file:///Users/hattori/Conteful/src/.nuxt/nuxt-icon-server-bundle.mjs';

const serverAssets = [{"baseName":"server","dir":"/Users/hattori/Conteful/src/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/hattori/Conteful/src","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/hattori/Conteful/src/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/hattori/Conteful/src/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/hattori/Conteful/src/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/hattori/Conteful/src/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
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



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/api/**": {
        "cors": true,
        "headers": {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "*",
          "access-control-allow-headers": "*",
          "access-control-max-age": "0"
        }
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {},
  "icon": {
    "serverKnownCssClasses": []
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

/**
* Nitro internal functions extracted from https://github.com/nitrojs/nitro/blob/v2/src/runtime/internal/utils.ts
*/
function isJsonRequest(event) {
	// If the client specifically requests HTML, then avoid classifying as JSON.
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		// let Nitro handle JSON errors
		return;
	}
	// invoke default Nitro error handler (which will log appropriately if required)
	const defaultRes = await defaultHandler(error, event, { json: true });
	// let Nitro handle redirect if appropriate
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
		// normalize to string format expected by nuxt `error.vue`
		defaultRes.body.stack = defaultRes.body.stack.join("\n");
	}
	const errorObject = defaultRes.body;
	// remove proto/hostname/port from URL
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	// add default server message (keep sanitized for unhandled errors)
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	// we will be rendering this error internally so we can pass along the error.data safely
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	// Access request headers
	const reqHeaders = getRequestHeaders(event);
	// Detect to avoid recursion in SSR rendering of errors
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	// HTML response (via SSR)
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	// Fallback to static rendered error page
	if (!res) {
		const { template } = await Promise.resolve().then(function () { return error500; });
		{
			// TODO: Support `message` in template
			errorObject.description = errorObject.message;
		}
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	if (!globalThis._importMeta_.test && typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") {
			return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
		}
	}
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _fTdz1pDnOQ1LMULw29k3ztRnZWLUZ7g4uPbm9A17vV4 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/Users/hattori/Conteful/src";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"description","content":"Bilingual Contentful-like headless CMS admin MVP."}],"link":[{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"preconnect","href":"https://fonts.gstatic.com","crossorigin":""},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&display=swap"}],"style":[],"script":[],"noscript":[],"title":"Conteful","titleTemplate":"%s | Conteful","htmlAttrs":{"lang":"ja"}};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : undefined,
	URL: (data) => data instanceof URL ? data.toString() : undefined
};
const asyncContext = getContext("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
const _Gy0FjA86kbqEPkTNzhpytt4ApmMK8LsGLxQ10t24F04 = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
			return;
		}
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) {
				continue;
			}
			if (EXCLUDE_TRACE_RE.test(entry.source)) {
				continue;
			}
			filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			filename,
			stack: trace
		};
		// retain log to be include in the next render
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	// Pass any logs to the client
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
			console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload.`);
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const plugins = [
  _fTdz1pDnOQ1LMULw29k3ztRnZWLUZ7g4uPbm9A17vV4,
_Gy0FjA86kbqEPkTNzhpytt4ApmMK8LsGLxQ10t24F04
];

const assets = {
  "/index.mjs": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"31f3f-3jsSQI52LkrHTH2ZHAWlGVhp2lU\"",
    "mtime": "2026-03-06T08:23:40.664Z",
    "size": 204607,
    "path": "index.mjs"
  },
  "/index.mjs.map": {
    "type": "application/json",
    "etag": "\"ba7a5-WiJ8/wg0e+6Xwz8Gp6cMpyXikI4\"",
    "mtime": "2026-03-06T08:23:40.665Z",
    "size": 763813,
    "path": "index.mjs.map"
  }
};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _bkfAKF = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function createSSRContext(event) {
	const ssrContext = {
		url: event.path,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

function buildAssetsDir() {
	// TODO: support passing event to `useRuntimeConfig`
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	// TODO: support passing event to `useRuntimeConfig`
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => import('file:///Users/hattori/Conteful/src/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => import('file:///Users/hattori/Conteful/src/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
// -- SSR Renderer --
const getSSRRenderer = lazyCachedFunction(async () => {
	// Load server bundle
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	// Load precomputed dependencies
	const precomputed = undefined ;
	// Create renderer
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		// In development with vite-node, the manifest is on-demand and will be available after rendering
		// eslint-disable-next-line no-restricted-globals
		if (process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});
// -- SPA Renderer --
const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = undefined ;
	// @ts-expect-error virtual file
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
			const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
			const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
			const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
			return appTemplate + loaderTemplate;
		}
	});
	// Create SPA renderer and cache the result for all requests
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
/**
* remove the root node from the html body
*/
function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		// remove teleport anchor to avoid hydration issues
		const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
	const nitroApp = useNitroApp();
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	// Render app
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	// Handle errors
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			// Do not add links to resources that are inlined (vite v5+)
			if ("inline" in getQuery(resource.file)) {
				continue;
			}
			// Add CSS links in <head> for CSS files
			// - in dev mode when rendering an island and the file has scoped styles and is not a page
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
				link.push({
					rel: "stylesheet",
					href: renderer.rendererContext.buildAssetsURL(resource.file),
					crossorigin: ""
				});
			}
		}
		if (link.length) {
			ssrContext.head.push({ link }, { mode: "server" });
		}
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
});
async function getIslandContext(event) {
	// TODO: Strict validation for url
	let url = event.path || "";
	const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	// TODO: Validate context
	const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
	const ctx = {
		url: "/",
		...context,
		id: hashId,
		name: componentName,
		props: destr$1(context.props) || {},
		slots: {},
		components: {}
	};
	return ctx;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

function createMeta(filters) {
  return {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    version: "v1",
    filters
  };
}
function toListResponse(items, filters) {
  return {
    items,
    total: items.length,
    meta: createMeta(filters)
  };
}
function toItemResponse(item, filters) {
  return {
    item,
    meta: createMeta(filters)
  };
}
function toMutationResponse(item, message) {
  return {
    item,
    message,
    meta: createMeta()
  };
}

const now = "2026-03-06T09:00:00.000Z";
const adminUsers = [
  {
    id: "usr_owner",
    name: "Aoi Hattori",
    email: "owner@conteful.app",
    password: "demo-pass",
    title: "Workspace Owner"
  },
  {
    id: "usr_editor",
    name: "Mina Sato",
    email: "editor@northstar.app",
    password: "demo-pass",
    title: "Editorial Manager"
  },
  {
    id: "usr_ops",
    name: "Ren Takeda",
    email: "ops@acme.app",
    password: "demo-pass",
    title: "Operations Lead"
  }
];
Object.fromEntries(
  adminUsers.map((user) => [user.email.toLowerCase(), user.password])
);
adminUsers.map(({ id, name, email, title }) => ({
  id,
  name,
  email,
  title
}));
const projects = [
  {
    id: "prj_conteful",
    name: "Conteful Core",
    slug: "conteful-core",
    description: "\u88FD\u54C1\u30B3\u30A2\u306E\u30B3\u30F3\u30C6\u30F3\u30C4\u8A2D\u8A08\u3068 API \u7BA1\u7406\u3092\u884C\u3046\u30E1\u30A4\u30F3\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3067\u3059\u3002",
    environment: "production",
    role: "owner",
    memberCount: 2,
    createdAt: "2026-02-12T03:30:00.000Z",
    updatedAt: now
  },
  {
    id: "prj_northstar",
    name: "Northstar Launch",
    slug: "northstar-launch",
    description: "\u30ED\u30FC\u30F3\u30C1\u5411\u3051\u306E\u914D\u4FE1\u9762\u3068\u544A\u77E5\u5C0E\u7DDA\u3092\u77ED\u304F\u56DE\u3059\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3067\u3059\u3002",
    environment: "staging",
    role: "owner",
    memberCount: 2,
    createdAt: "2026-02-16T02:00:00.000Z",
    updatedAt: "2026-03-06T06:50:00.000Z"
  },
  {
    id: "prj_acme",
    name: "Acme Ops",
    slug: "acme-ops",
    description: "\u904B\u7528\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3068\u793E\u5185\u30DA\u30FC\u30B8\u914D\u4FE1\u3092\u6271\u3046\u30AA\u30DA\u30EC\u30FC\u30B7\u30E7\u30F3\u7528\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3067\u3059\u3002",
    environment: "production",
    role: "owner",
    memberCount: 1,
    createdAt: "2026-02-22T01:00:00.000Z",
    updatedAt: "2026-03-05T13:10:00.000Z"
  }
];
const projectMemberships = [
  {
    id: "pm_conteful_owner",
    projectId: "prj_conteful",
    userId: "usr_owner",
    role: "owner",
    joinedAt: "2026-02-12T03:30:00.000Z",
    updatedAt: now
  },
  {
    id: "pm_conteful_ops",
    projectId: "prj_conteful",
    userId: "usr_ops",
    role: "viewer",
    joinedAt: "2026-02-28T04:00:00.000Z",
    updatedAt: "2026-03-03T08:00:00.000Z"
  },
  {
    id: "pm_northstar_editor",
    projectId: "prj_northstar",
    userId: "usr_editor",
    role: "owner",
    joinedAt: "2026-02-16T02:00:00.000Z",
    updatedAt: "2026-03-06T06:50:00.000Z"
  },
  {
    id: "pm_northstar_owner",
    projectId: "prj_northstar",
    userId: "usr_owner",
    role: "admin",
    joinedAt: "2026-02-20T01:00:00.000Z",
    updatedAt: "2026-03-04T04:10:00.000Z"
  },
  {
    id: "pm_acme_ops",
    projectId: "prj_acme",
    userId: "usr_ops",
    role: "owner",
    joinedAt: "2026-02-22T01:00:00.000Z",
    updatedAt: "2026-03-05T13:10:00.000Z"
  }
];
const projectInvites = [
  {
    id: "inv_conteful_editor",
    projectId: "prj_conteful",
    projectName: "Conteful Core",
    email: "editor@northstar.app",
    role: "editor",
    status: "pending",
    token: "invite_conteful_editor",
    invitedByUserId: "usr_owner",
    acceptedByUserId: null,
    createdAt: "2026-03-06T04:00:00.000Z",
    updatedAt: "2026-03-06T04:00:00.000Z",
    acceptedAt: null
  },
  {
    id: "inv_northstar_ops",
    projectId: "prj_northstar",
    projectName: "Northstar Launch",
    email: "ops@acme.app",
    role: "viewer",
    status: "pending",
    token: "invite_northstar_ops",
    invitedByUserId: "usr_editor",
    acceptedByUserId: null,
    createdAt: "2026-03-05T09:30:00.000Z",
    updatedAt: "2026-03-05T09:30:00.000Z",
    acceptedAt: null
  }
];
const projectWebhooks = [
  {
    id: "wh_conteful_publish",
    projectId: "prj_conteful",
    name: "Publish Relay",
    url: "https://hooks.example.com/conteful/publish",
    status: "active",
    events: ["entry.published", "entry.updated", "media.updated"],
    secret: "whsec_conteful_publish",
    lastDeliveredAt: "2026-03-06T08:40:00.000Z",
    lastStatusCode: 202,
    lastEvent: "entry.published",
    failureCount: 0,
    createdAt: "2026-02-18T02:40:00.000Z",
    updatedAt: "2026-03-06T08:40:00.000Z"
  },
  {
    id: "wh_northstar_preview",
    projectId: "prj_northstar",
    name: "Preview Previewer",
    url: "https://hooks.example.com/northstar/preview",
    status: "paused",
    events: ["entry.published"],
    secret: "whsec_northstar_preview",
    lastDeliveredAt: "2026-03-05T10:50:00.000Z",
    lastStatusCode: 500,
    lastEvent: "entry.published",
    failureCount: 2,
    createdAt: "2026-02-24T00:20:00.000Z",
    updatedAt: "2026-03-05T10:50:00.000Z"
  }
];
const contentModels = [
  {
    id: "mdl_article",
    projectId: "prj_conteful",
    name: "Article",
    apiId: "articles",
    description: "\u30CB\u30E5\u30FC\u30B9\u3001\u544A\u77E5\u3001\u5C0E\u5165\u4E8B\u4F8B\u3092\u6271\u3046\u6C4E\u7528\u8A18\u4E8B\u30E2\u30C7\u30EB\u3067\u3059\u3002",
    status: "active",
    titleFieldKey: "title",
    slugFieldKey: "slug",
    listFieldKeys: ["title", "publishedDate", "featured"],
    createdAt: "2026-02-12T03:30:00.000Z",
    updatedAt: "2026-03-06T07:10:00.000Z",
    fields: [
      {
        id: "fld_article_title",
        name: "Title",
        key: "title",
        apiKey: "title",
        type: "text",
        required: true,
        unique: false,
        isTitle: true,
        showInList: true,
        validation: { minLength: 5, maxLength: 120 },
        order: 1,
        description: "\u4E00\u89A7\u3068\u8A73\u7D30\u306E\u5148\u982D\u306B\u8868\u793A\u3059\u308B\u898B\u51FA\u3057\u3002"
      },
      {
        id: "fld_article_slug",
        name: "Slug",
        key: "slug",
        apiKey: "slug",
        type: "text",
        required: true,
        unique: true,
        isTitle: false,
        showInList: false,
        validation: { pattern: "^[a-z0-9-]+$" },
        order: 2,
        description: "\u516C\u958B API \u3068\u8A73\u7D30 URL \u306E\u8B58\u5225\u5B50\u3002"
      },
      {
        id: "fld_article_summary",
        name: "Summary",
        key: "summary",
        apiKey: "summary",
        type: "textarea",
        required: true,
        unique: false,
        isTitle: false,
        showInList: true,
        validation: { maxLength: 180 },
        order: 3
      },
      {
        id: "fld_article_body",
        name: "Body",
        key: "body",
        apiKey: "body",
        type: "richText",
        required: true,
        unique: false,
        isTitle: false,
        showInList: false,
        validation: {},
        order: 4
      },
      {
        id: "fld_article_hero_image",
        name: "Hero Image",
        key: "heroImage",
        apiKey: "heroImage",
        type: "media",
        required: false,
        unique: false,
        isTitle: false,
        showInList: false,
        validation: { allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"] },
        order: 5
      },
      {
        id: "fld_article_category",
        name: "Category",
        key: "category",
        apiKey: "category",
        type: "reference",
        required: true,
        unique: false,
        isTitle: false,
        showInList: true,
        validation: { referenceModelId: "mdl_category" },
        referenceModelId: "mdl_category",
        order: 6
      },
      {
        id: "fld_article_published_date",
        name: "Published Date",
        key: "publishedDate",
        apiKey: "publishedDate",
        type: "date",
        required: true,
        unique: false,
        isTitle: false,
        showInList: true,
        validation: {},
        order: 7
      },
      {
        id: "fld_article_featured",
        name: "Featured",
        key: "featured",
        apiKey: "featured",
        type: "boolean",
        required: false,
        unique: false,
        isTitle: false,
        showInList: true,
        validation: {},
        order: 8
      }
    ]
  },
  {
    id: "mdl_page",
    projectId: "prj_conteful",
    name: "Landing Page",
    apiId: "pages",
    description: "\u56FA\u5B9A\u30DA\u30FC\u30B8\u3068\u30AD\u30E3\u30F3\u30DA\u30FC\u30F3 LP \u7528\u306E\u30E2\u30C7\u30EB\u3067\u3059\u3002",
    status: "active",
    titleFieldKey: "title",
    slugFieldKey: "slug",
    listFieldKeys: ["title", "slug"],
    createdAt: "2026-02-20T06:00:00.000Z",
    updatedAt: "2026-03-05T10:45:00.000Z",
    fields: [
      {
        id: "fld_page_title",
        name: "Title",
        key: "title",
        apiKey: "title",
        type: "text",
        required: true,
        unique: false,
        isTitle: true,
        showInList: true,
        validation: { minLength: 3, maxLength: 120 },
        order: 1
      },
      {
        id: "fld_page_slug",
        name: "Slug",
        key: "slug",
        apiKey: "slug",
        type: "text",
        required: true,
        unique: true,
        isTitle: false,
        showInList: true,
        validation: { pattern: "^[a-z0-9-]+$" },
        order: 2
      },
      {
        id: "fld_page_intro",
        name: "Intro",
        key: "intro",
        apiKey: "intro",
        type: "textarea",
        required: true,
        unique: false,
        isTitle: false,
        showInList: true,
        validation: { maxLength: 160 },
        order: 3
      },
      {
        id: "fld_page_body",
        name: "Body",
        key: "body",
        apiKey: "body",
        type: "richText",
        required: true,
        unique: false,
        isTitle: false,
        showInList: false,
        validation: {},
        order: 4
      },
      {
        id: "fld_page_cover_image",
        name: "Cover Image",
        key: "coverImage",
        apiKey: "coverImage",
        type: "media",
        required: false,
        unique: false,
        isTitle: false,
        showInList: false,
        validation: { allowedMimeTypes: ["image/jpeg", "image/png"] },
        order: 5
      }
    ]
  },
  {
    id: "mdl_category",
    projectId: "prj_conteful",
    name: "Category",
    apiId: "categories",
    description: "\u8A18\u4E8B\u3084\u56FA\u5B9A\u30DA\u30FC\u30B8\u304B\u3089\u53C2\u7167\u3059\u308B\u5206\u985E\u30DE\u30B9\u30BF\u3067\u3059\u3002",
    status: "active",
    titleFieldKey: "name",
    slugFieldKey: "slug",
    listFieldKeys: ["name", "slug"],
    createdAt: "2026-02-12T03:30:00.000Z",
    updatedAt: "2026-03-04T01:20:00.000Z",
    fields: [
      {
        id: "fld_category_name",
        name: "Name",
        key: "name",
        apiKey: "name",
        type: "text",
        required: true,
        unique: false,
        isTitle: true,
        showInList: true,
        validation: { minLength: 2, maxLength: 40 },
        order: 1
      },
      {
        id: "fld_category_slug",
        name: "Slug",
        key: "slug",
        apiKey: "slug",
        type: "text",
        required: true,
        unique: true,
        isTitle: false,
        showInList: true,
        validation: { pattern: "^[a-z0-9-]+$" },
        order: 2
      },
      {
        id: "fld_category_description",
        name: "Description",
        key: "description",
        apiKey: "description",
        type: "textarea",
        required: false,
        unique: false,
        isTitle: false,
        showInList: false,
        validation: { maxLength: 140 },
        order: 3
      }
    ]
  },
  {
    id: "mdl_release",
    projectId: "prj_northstar",
    name: "Release Note",
    apiId: "release-notes",
    description: "Northstar \u306E\u66F4\u65B0\u544A\u77E5\u3092\u307E\u3068\u3081\u308B\u30E2\u30C7\u30EB\u3067\u3059\u3002",
    status: "active",
    titleFieldKey: "title",
    slugFieldKey: "slug",
    listFieldKeys: ["title", "releaseDate"],
    createdAt: "2026-02-18T04:00:00.000Z",
    updatedAt: "2026-03-06T06:50:00.000Z",
    fields: [
      {
        id: "fld_release_title",
        name: "Title",
        key: "title",
        apiKey: "title",
        type: "text",
        required: true,
        unique: false,
        isTitle: true,
        showInList: true,
        validation: { minLength: 3, maxLength: 100 },
        order: 1
      },
      {
        id: "fld_release_slug",
        name: "Slug",
        key: "slug",
        apiKey: "slug",
        type: "text",
        required: true,
        unique: true,
        isTitle: false,
        showInList: true,
        validation: { pattern: "^[a-z0-9-]+$" },
        order: 2
      },
      {
        id: "fld_release_summary",
        name: "Summary",
        key: "summary",
        apiKey: "summary",
        type: "textarea",
        required: true,
        unique: false,
        isTitle: false,
        showInList: true,
        validation: { maxLength: 160 },
        order: 3
      },
      {
        id: "fld_release_date",
        name: "Release Date",
        key: "releaseDate",
        apiKey: "releaseDate",
        type: "date",
        required: true,
        unique: false,
        isTitle: false,
        showInList: true,
        validation: {},
        order: 4
      }
    ]
  },
  {
    id: "mdl_playbook",
    projectId: "prj_acme",
    name: "Ops Playbook",
    apiId: "playbooks",
    description: "\u904B\u7528\u624B\u9806\u3084\u793E\u5185\u30AC\u30A4\u30C9\u3092\u6271\u3046\u30E2\u30C7\u30EB\u3067\u3059\u3002",
    status: "active",
    titleFieldKey: "title",
    slugFieldKey: "slug",
    listFieldKeys: ["title", "owner"],
    createdAt: "2026-02-24T04:30:00.000Z",
    updatedAt: "2026-03-05T13:10:00.000Z",
    fields: [
      {
        id: "fld_playbook_title",
        name: "Title",
        key: "title",
        apiKey: "title",
        type: "text",
        required: true,
        unique: false,
        isTitle: true,
        showInList: true,
        validation: { minLength: 3, maxLength: 100 },
        order: 1
      },
      {
        id: "fld_playbook_slug",
        name: "Slug",
        key: "slug",
        apiKey: "slug",
        type: "text",
        required: true,
        unique: true,
        isTitle: false,
        showInList: true,
        validation: { pattern: "^[a-z0-9-]+$" },
        order: 2
      },
      {
        id: "fld_playbook_owner",
        name: "Owner",
        key: "owner",
        apiKey: "owner",
        type: "text",
        required: true,
        unique: false,
        isTitle: false,
        showInList: true,
        validation: {},
        order: 3
      },
      {
        id: "fld_playbook_body",
        name: "Body",
        key: "body",
        apiKey: "body",
        type: "richText",
        required: true,
        unique: false,
        isTitle: false,
        showInList: false,
        validation: {},
        order: 4
      }
    ]
  }
];
const mediaItems = [
  {
    id: "med_launch_board",
    projectId: "prj_conteful",
    fileName: "launch-board.png",
    url: "https://placehold.co/960x540/111111/FFFFFF/png?text=Launch+Board",
    mimeType: "image/png",
    size: 248576,
    alt: "Launch board planning image",
    description: "\u88FD\u54C1\u30ED\u30FC\u30F3\u30C1\u7528\u306E\u30AD\u30FC\u30D3\u30B8\u30E5\u30A2\u30EB\u3002",
    tags: ["launch", "hero"],
    linkedEntryCount: 1,
    createdAt: "2026-03-01T02:10:00.000Z",
    updatedAt: "2026-03-06T06:40:00.000Z"
  },
  {
    id: "med_partner_story",
    projectId: "prj_conteful",
    fileName: "partner-story.jpg",
    url: "https://placehold.co/960x540/F4F4F4/111111/jpeg?text=Partner+Story",
    mimeType: "image/jpeg",
    size: 196342,
    alt: "Partner success story key visual",
    description: "\u5C0E\u5165\u4E8B\u4F8B\u30DA\u30FC\u30B8\u7528\u306E\u5199\u771F\u7D20\u6750\u3002",
    tags: ["case-study", "story"],
    linkedEntryCount: 1,
    createdAt: "2026-02-26T08:00:00.000Z",
    updatedAt: "2026-03-05T11:45:00.000Z"
  },
  {
    id: "med_company_cover",
    projectId: "prj_conteful",
    fileName: "company-cover.webp",
    url: "https://placehold.co/1200x720/222222/F3F3F3/webp?text=Company+Profile",
    mimeType: "image/webp",
    size: 165112,
    alt: "Company profile cover image",
    description: "\u4F1A\u793E\u7D39\u4ECB\u30DA\u30FC\u30B8\u306E\u30D5\u30A1\u30FC\u30B9\u30C8\u30D3\u30E5\u30FC\u753B\u50CF\u3002",
    tags: ["company", "cover"],
    linkedEntryCount: 1,
    createdAt: "2026-02-21T01:05:00.000Z",
    updatedAt: "2026-03-04T10:00:00.000Z"
  },
  {
    id: "med_northstar_wave",
    projectId: "prj_northstar",
    fileName: "northstar-wave.png",
    url: "https://placehold.co/960x540/0D1B2A/E0E1DD/png?text=Northstar+Wave",
    mimeType: "image/png",
    size: 142820,
    alt: "Northstar release banner",
    description: "\u30ED\u30FC\u30F3\u30C1\u544A\u77E5\u7528\u306E\u30D2\u30FC\u30ED\u30FC\u753B\u50CF\u3067\u3059\u3002",
    tags: ["launch", "release"],
    linkedEntryCount: 1,
    createdAt: "2026-03-03T04:40:00.000Z",
    updatedAt: "2026-03-06T06:45:00.000Z"
  },
  {
    id: "med_acme_playbook",
    projectId: "prj_acme",
    fileName: "playbook-cover.png",
    url: "https://placehold.co/960x540/232323/F1E9DA/png?text=Ops+Playbook",
    mimeType: "image/png",
    size: 185e3,
    alt: "Operations playbook cover",
    description: "\u904B\u7528\u624B\u9806\u66F8\u306E\u5148\u982D\u3067\u4F7F\u3046\u753B\u50CF\u3067\u3059\u3002",
    tags: ["ops", "guide"],
    linkedEntryCount: 0,
    createdAt: "2026-03-02T06:10:00.000Z",
    updatedAt: "2026-03-05T13:10:00.000Z"
  }
];
const contentEntries = [
  {
    id: "ent_news_launch_2026",
    projectId: "prj_conteful",
    modelId: "mdl_article",
    title: "Spring Launch 2026",
    slug: "spring-launch-2026",
    status: "published",
    fields: {
      title: "Spring Launch 2026",
      slug: "spring-launch-2026",
      summary: "\u65B0\u3057\u3044\u914D\u4FE1\u57FA\u76E4\u3068 API \u8A2D\u8A08\u3092\u7D39\u4ECB\u3059\u308B\u304A\u77E5\u3089\u305B\u3067\u3059\u3002",
      body: "2026 \u6625\u306E\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u3067\u306F\u3001\u914D\u4FE1\u306E\u5B89\u5B9A\u6027\u3068\u7DE8\u96C6\u4F53\u9A13\u3092\u540C\u6642\u306B\u6539\u5584\u3057\u307E\u3057\u305F\u3002",
      heroImage: "med_launch_board",
      category: "ent_category_news",
      publishedDate: "2026-03-06",
      featured: true
    },
    publishedAt: "2026-03-06T07:10:00.000Z",
    createdAt: "2026-03-01T00:20:00.000Z",
    updatedAt: "2026-03-06T07:10:00.000Z"
  },
  {
    id: "ent_partner_success_story",
    projectId: "prj_conteful",
    modelId: "mdl_article",
    title: "Partner Success Story",
    slug: "partner-success-story",
    status: "draft",
    fields: {
      title: "Partner Success Story",
      slug: "partner-success-story",
      summary: "\u5C0E\u5165\u30C1\u30FC\u30E0\u306E\u30EF\u30FC\u30AF\u30D5\u30ED\u30FC\u77ED\u7E2E\u4E8B\u4F8B\u3092\u307E\u3068\u3081\u305F\u30C9\u30E9\u30D5\u30C8\u3067\u3059\u3002",
      body: "\u30C9\u30E9\u30D5\u30C8\u6BB5\u968E\u306E\u305F\u3081\u672C\u6587\u306F\u78BA\u8A8D\u4E2D\u3067\u3059\u3002",
      heroImage: "med_partner_story",
      category: "ent_category_case-study",
      publishedDate: "2026-03-03",
      featured: false
    },
    publishedAt: null,
    createdAt: "2026-03-02T03:15:00.000Z",
    updatedAt: "2026-03-05T09:50:00.000Z"
  },
  {
    id: "ent_company_profile",
    projectId: "prj_conteful",
    modelId: "mdl_page",
    title: "Company Profile",
    slug: "company-profile",
    status: "published",
    fields: {
      title: "Company Profile",
      slug: "company-profile",
      intro: "\u4F01\u696D\u60C5\u5831\u3068\u4FA1\u5024\u89B3\u3092\u307E\u3068\u3081\u305F\u56FA\u5B9A\u30DA\u30FC\u30B8\u3067\u3059\u3002",
      body: "Conteful \u306F API \u524D\u63D0\u306E\u30B3\u30F3\u30C6\u30F3\u30C4\u904B\u7528\u3092\u77ED\u304F\u56DE\u3059\u305F\u3081\u306E CMS \u3092\u76EE\u6307\u3057\u3066\u3044\u307E\u3059\u3002",
      coverImage: "med_company_cover"
    },
    publishedAt: "2026-03-04T10:00:00.000Z",
    createdAt: "2026-02-21T01:10:00.000Z",
    updatedAt: "2026-03-04T10:00:00.000Z"
  },
  {
    id: "ent_category_news",
    projectId: "prj_conteful",
    modelId: "mdl_category",
    title: "News",
    slug: "news",
    status: "published",
    fields: {
      name: "News",
      slug: "news",
      description: "\u66F4\u65B0\u60C5\u5831\u3068\u544A\u77E5\u3092\u307E\u3068\u3081\u308B\u30AB\u30C6\u30B4\u30EA\u30FC\u3067\u3059\u3002"
    },
    publishedAt: "2026-02-12T04:00:00.000Z",
    createdAt: "2026-02-12T03:40:00.000Z",
    updatedAt: "2026-03-04T01:20:00.000Z"
  },
  {
    id: "ent_category_case-study",
    projectId: "prj_conteful",
    modelId: "mdl_category",
    title: "Case Study",
    slug: "case-study",
    status: "published",
    fields: {
      name: "Case Study",
      slug: "case-study",
      description: "\u5C0E\u5165\u4E8B\u4F8B\u3068\u6D3B\u7528\u30EC\u30DD\u30FC\u30C8\u3092\u307E\u3068\u3081\u308B\u30AB\u30C6\u30B4\u30EA\u30FC\u3067\u3059\u3002"
    },
    publishedAt: "2026-02-12T04:10:00.000Z",
    createdAt: "2026-02-12T03:45:00.000Z",
    updatedAt: "2026-03-03T10:25:00.000Z"
  },
  {
    id: "ent_northstar_release",
    projectId: "prj_northstar",
    modelId: "mdl_release",
    title: "Northstar Beta Refresh",
    slug: "northstar-beta-refresh",
    status: "published",
    fields: {
      title: "Northstar Beta Refresh",
      slug: "northstar-beta-refresh",
      summary: "\u30D9\u30FC\u30BF\u5C0E\u7DDA\u3068 LP \u30D6\u30ED\u30C3\u30AF\u3092\u66F4\u65B0\u3057\u305F\u30EA\u30EA\u30FC\u30B9\u30CE\u30FC\u30C8\u3067\u3059\u3002",
      releaseDate: "2026-03-06"
    },
    publishedAt: "2026-03-06T06:50:00.000Z",
    createdAt: "2026-03-03T04:10:00.000Z",
    updatedAt: "2026-03-06T06:50:00.000Z"
  },
  {
    id: "ent_acme_playbook",
    projectId: "prj_acme",
    modelId: "mdl_playbook",
    title: "Incident Handoff",
    slug: "incident-handoff",
    status: "draft",
    fields: {
      title: "Incident Handoff",
      slug: "incident-handoff",
      owner: "Operations",
      body: "\u30A4\u30F3\u30B7\u30C7\u30F3\u30C8\u5F15\u304D\u7D99\u304E\u6642\u306E\u521D\u52D5\u624B\u9806\u3092\u6574\u7406\u3057\u305F\u30C9\u30E9\u30D5\u30C8\u3067\u3059\u3002"
    },
    publishedAt: null,
    createdAt: "2026-03-02T05:40:00.000Z",
    updatedAt: "2026-03-05T13:10:00.000Z"
  }
];
const apiTokens = [
  {
    id: "tok_delivery_public",
    projectId: "prj_conteful",
    name: "Public Delivery",
    token: "ctf_deliv_9af83c1d8e0f",
    type: "delivery",
    status: "active",
    scopes: ["content:read", "media:read"],
    lastUsedAt: "2026-03-06T08:10:00.000Z",
    expiresAt: null,
    createdAt: "2026-02-20T05:00:00.000Z",
    updatedAt: "2026-03-06T08:10:00.000Z"
  },
  {
    id: "tok_delivery_preview",
    projectId: "prj_conteful",
    name: "Preview Delivery",
    token: "ctf_deliv_3c5bd0eaa982",
    type: "delivery",
    status: "active",
    scopes: ["content:read", "media:read", "preview:read"],
    lastUsedAt: "2026-03-05T18:22:00.000Z",
    expiresAt: "2026-09-01T00:00:00.000Z",
    createdAt: "2026-02-28T10:30:00.000Z",
    updatedAt: "2026-03-05T18:22:00.000Z"
  },
  {
    id: "tok_mgmt_admin",
    projectId: "prj_conteful",
    name: "Management Admin",
    token: "ctf_mgmt_a20c76f3d1b2",
    type: "management",
    status: "active",
    scopes: ["models:write", "entries:write", "media:write"],
    lastUsedAt: now,
    expiresAt: null,
    createdAt: "2026-02-18T02:00:00.000Z",
    updatedAt: now
  },
  {
    id: "tok_northstar_delivery",
    projectId: "prj_northstar",
    name: "Northstar Delivery",
    token: "ctf_deliv_northstar_4d39c8",
    type: "delivery",
    status: "active",
    scopes: ["content:read"],
    lastUsedAt: "2026-03-06T06:30:00.000Z",
    expiresAt: null,
    createdAt: "2026-02-24T03:20:00.000Z",
    updatedAt: "2026-03-06T06:30:00.000Z"
  },
  {
    id: "tok_acme_management",
    projectId: "prj_acme",
    name: "Acme Management",
    token: "ctf_mgmt_acme_932ad1",
    type: "management",
    status: "active",
    scopes: ["models:write", "entries:write"],
    lastUsedAt: "2026-03-05T12:00:00.000Z",
    expiresAt: null,
    createdAt: "2026-02-26T01:50:00.000Z",
    updatedAt: "2026-03-05T12:00:00.000Z"
  }
];

const storeHost = globalThis;
function clone(value) {
  return structuredClone(value);
}
function nowIso() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function createId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
function createInitialStore() {
  return {
    users: clone(adminUsers),
    projects: clone(projects),
    memberships: clone(projectMemberships),
    invites: clone(projectInvites),
    webhooks: clone(projectWebhooks),
    models: clone(contentModels),
    entries: clone(contentEntries),
    media: clone(mediaItems),
    tokens: clone(apiTokens),
    sessions: []
  };
}
function getStore() {
  if (!storeHost.__contefulMockStore) {
    storeHost.__contefulMockStore = createInitialStore();
  }
  return storeHost.__contefulMockStore;
}
function sortByUpdatedAt(items) {
  return [...items].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}
function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function normalizeIdentifier(value) {
  const cleaned = value.trim().replace(/[^a-zA-Z0-9]+/g, " ").replace(/\s+/g, " ");
  if (!cleaned) {
    return "";
  }
  const [first, ...rest] = cleaned.split(" ");
  return [
    first.charAt(0).toLowerCase() + first.slice(1),
    ...rest.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  ].join("");
}
function normalizeFieldType(value) {
  const allowed = [
    "text",
    "textarea",
    "richText",
    "number",
    "boolean",
    "date",
    "json",
    "media",
    "reference"
  ];
  if (!value || !allowed.includes(value)) {
    return "text";
  }
  return value;
}
function normalizeField(field, index) {
  var _a, _b, _c, _d;
  const displayName = ((_a = field.name) == null ? void 0 : _a.trim()) || `Field ${index + 1}`;
  const key = normalizeIdentifier(field.key || field.apiKey || displayName);
  const apiKey = normalizeIdentifier(field.apiKey || field.key || displayName);
  return {
    id: field.id || createId("fld"),
    name: displayName,
    key: key || `field${index + 1}`,
    apiKey: apiKey || `field${index + 1}`,
    type: normalizeFieldType(field.type),
    required: Boolean(field.required),
    unique: Boolean(field.unique),
    isTitle: Boolean(field.isTitle),
    showInList: (_b = field.showInList) != null ? _b : Boolean(field.isTitle),
    validation: field.validation || {},
    order: field.order || index + 1,
    referenceModelId: field.referenceModelId || ((_c = field.validation) == null ? void 0 : _c.referenceModelId) || null,
    description: ((_d = field.description) == null ? void 0 : _d.trim()) || ""
  };
}
function normalizeModelPayload(input, projectId) {
  var _a, _b, _c, _d, _e, _f;
  const timestamp = nowIso();
  const rawFields = input.fields || [];
  const fields = rawFields.map((field, index) => normalizeField(field, index)).sort((left, right) => left.order - right.order);
  const name = ((_a = input.name) == null ? void 0 : _a.trim()) || "Untitled Model";
  const apiId = slugify(input.apiId || name);
  const titleFieldKey = input.titleFieldKey || ((_b = fields.find((field) => field.isTitle)) == null ? void 0 : _b.key) || ((_c = fields[0]) == null ? void 0 : _c.key) || null;
  const slugFieldKey = input.slugFieldKey || ((_d = fields.find((field) => field.key === "slug")) == null ? void 0 : _d.key) || null;
  return {
    id: input.id || createId("mdl"),
    projectId,
    name,
    apiId: apiId || createId("model"),
    description: ((_e = input.description) == null ? void 0 : _e.trim()) || "",
    status: input.status || "active",
    titleFieldKey,
    slugFieldKey,
    listFieldKeys: ((_f = input.listFieldKeys) == null ? void 0 : _f.length) ? input.listFieldKeys : fields.filter((field) => field.showInList).map((field) => field.key),
    fields,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp
  };
}
function matchesSearch(value, search) {
  if (!search) {
    return true;
  }
  return value.toLowerCase().includes(search.trim().toLowerCase());
}
function toSafeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    title: user.title
  };
}
function getUserOrThrow(id) {
  const user = getStore().users.find((item) => item.id === id);
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: `User ${id} was not found.`
    });
  }
  return user;
}
function getProjectOrThrow(id) {
  const project = getStore().projects.find((item) => item.id === id);
  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: `Project ${id} was not found.`
    });
  }
  return project;
}
function getModelOrThrow(id, projectId) {
  const model = getStore().models.find((item) => item.id === id && (!projectId || item.projectId === projectId));
  if (!model) {
    throw createError({
      statusCode: 404,
      statusMessage: `Model ${id} was not found.`
    });
  }
  return model;
}
function getEntryOrThrow(id, projectId) {
  const entry = getStore().entries.find((item) => item.id === id && (!projectId || item.projectId === projectId));
  if (!entry) {
    throw createError({
      statusCode: 404,
      statusMessage: `Entry ${id} was not found.`
    });
  }
  return entry;
}
function getMediaOrThrow(id, projectId) {
  const item = getStore().media.find((media) => media.id === id && (!projectId || media.projectId === projectId));
  if (!item) {
    throw createError({
      statusCode: 404,
      statusMessage: `Media ${id} was not found.`
    });
  }
  return item;
}
function getTokenOrThrow(id, projectId) {
  const token = getStore().tokens.find((item) => item.id === id && (!projectId || item.projectId === projectId));
  if (!token) {
    throw createError({
      statusCode: 404,
      statusMessage: `Token ${id} was not found.`
    });
  }
  return token;
}
function getInviteOrThrow(id) {
  const invite = getStore().invites.find((item) => item.id === id);
  if (!invite) {
    throw createError({
      statusCode: 404,
      statusMessage: `Invite ${id} was not found.`
    });
  }
  return invite;
}
function getInviteByTokenOrThrow(token) {
  const invite = getStore().invites.find((item) => item.token === token || item.id === token);
  if (!invite) {
    throw createError({
      statusCode: 404,
      statusMessage: `Invite token ${token} was not found.`
    });
  }
  return invite;
}
function getWebhookOrThrow(id, projectId) {
  const webhook = getStore().webhooks.find((item) => item.id === id && (!projectId || item.projectId === projectId));
  if (!webhook) {
    throw createError({
      statusCode: 404,
      statusMessage: `Webhook ${id} was not found.`
    });
  }
  return webhook;
}
function getSessionRecordOrThrow(sessionId) {
  const session = getStore().sessions.find((item) => item.id === sessionId);
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Session not found."
    });
  }
  return session;
}
function getMembership(projectId, userId) {
  return getStore().memberships.find((item) => item.projectId === projectId && item.userId === userId) || null;
}
function getProjectMemberCount(projectId) {
  return getStore().memberships.filter((item) => item.projectId === projectId).length;
}
function buildProjectSummary(projectId, userId) {
  const project = getProjectOrThrow(projectId);
  const membership = getMembership(projectId, userId);
  if (!membership) {
    throw createError({
      statusCode: 403,
      statusMessage: `User ${userId} does not belong to project ${projectId}.`
    });
  }
  return {
    ...clone(project),
    role: membership.role,
    memberCount: getProjectMemberCount(projectId)
  };
}
function buildPendingInvites(email) {
  return sortByUpdatedAt(getStore().invites).filter((invite) => invite.email === email).filter((invite) => invite.status === "pending").map((invite) => clone(invite));
}
function buildAuthSession(record) {
  const user = getUserOrThrow(record.userId);
  const projectsForUser = getStore().memberships.filter((item) => item.userId === record.userId).map((item) => buildProjectSnapshot(item.projectId, record.userId, record.activeProjectId)).sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  const activeProject = record.activeProjectId ? projectsForUser.find((project) => project.id === record.activeProjectId) || projectsForUser[0] || null : projectsForUser[0] || null;
  return {
    sessionId: record.id,
    user: toSafeUser(user),
    activeProject,
    projects: projectsForUser,
    pendingInvites: buildPendingInvites(user.email),
    activeProjectId: (activeProject == null ? void 0 : activeProject.id) || record.activeProjectId || null,
    availableProjects: projectsForUser,
    lastLoginAt: record.updatedAt
  };
}
function ensureMemberProject(projectId, userId) {
  const membership = getMembership(projectId, userId);
  if (!membership) {
    throw createError({
      statusCode: 403,
      statusMessage: `User ${userId} is not a member of project ${projectId}.`
    });
  }
  return membership;
}
function ensureProjectManager(projectId, userId) {
  const membership = ensureMemberProject(projectId, userId);
  if (!["owner", "admin"].includes(membership.role)) {
    throw createError({
      statusCode: 403,
      statusMessage: "Only owners or admins can manage invites for this project."
    });
  }
  return membership;
}
function getScopedProjectId(sessionId, requestedProjectId) {
  var _a;
  if (requestedProjectId) {
    return requestedProjectId;
  }
  if (sessionId) {
    const session = getSessionRecordOrThrow(sessionId);
    if (session.activeProjectId) {
      return session.activeProjectId;
    }
  }
  const fallback = (_a = getStore().projects[0]) == null ? void 0 : _a.id;
  if (!fallback) {
    throw createError({
      statusCode: 400,
      statusMessage: "No project is available."
    });
  }
  return fallback;
}
function getSessionIdFromScope(scope) {
  const sessionId = scope == null ? void 0 : scope.sessionId;
  if (!sessionId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication is required."
    });
  }
  return sessionId;
}
function getProjectIdFromScope(scope) {
  if (typeof scope === "string") {
    return scope;
  }
  return getScopedProjectId(scope == null ? void 0 : scope.sessionId, scope == null ? void 0 : scope.projectId);
}
function getUserIdFromScope(scope) {
  const sessionId = getSessionIdFromScope(scope);
  return getSessionRecordOrThrow(sessionId).userId;
}
function getProjectCounts(projectId) {
  return {
    modelCount: getStore().models.filter((item) => item.projectId === projectId).length,
    entryCount: getStore().entries.filter((item) => item.projectId === projectId).length,
    mediaCount: getStore().media.filter((item) => item.projectId === projectId).length,
    tokenCount: getStore().tokens.filter((item) => item.projectId === projectId).length,
    webhookCount: getStore().webhooks.filter((item) => item.projectId === projectId).length
  };
}
function buildProjectSnapshot(projectId, userId, currentProjectId) {
  const project = buildProjectSummary(projectId, userId);
  const counts = getProjectCounts(projectId);
  return {
    ...project,
    ...counts,
    isCurrent: project.id === currentProjectId,
    pendingInviteCount: getStore().invites.filter((invite) => invite.projectId === projectId && invite.status === "pending").length
  };
}
function buildProjectMembers(projectId) {
  return getStore().memberships.filter((item) => item.projectId === projectId).map((item) => ({
    ...clone(item),
    user: toSafeUser(getUserOrThrow(item.userId))
  }));
}
function isIdInValue(value, id) {
  if (typeof value === "string") {
    return value === id;
  }
  if (Array.isArray(value)) {
    return value.some((item) => isIdInValue(item, id));
  }
  if (value && typeof value === "object") {
    return Object.values(value).some((item) => isIdInValue(item, id));
  }
  return false;
}
function countLinkedEntries(id, projectId) {
  return getStore().entries.filter((entry) => {
    if (entry.projectId !== projectId) {
      return false;
    }
    return Object.values(entry.fields).some((value) => isIdInValue(value, id));
  }).length;
}
function withMediaStats(item) {
  return {
    ...clone(item),
    linkedEntryCount: countLinkedEntries(item.id, item.projectId)
  };
}
function buildEntryReference(entryId, projectId) {
  const entry = getStore().entries.find((item) => item.id === entryId && item.projectId === projectId);
  if (!entry) {
    return null;
  }
  return {
    id: entry.id,
    projectId: entry.projectId,
    modelId: entry.modelId,
    title: entry.title,
    slug: entry.slug,
    status: entry.status
  };
}
function resolveFieldValue(field, value, projectId) {
  if (typeof value === "undefined" || value === null) {
    return null;
  }
  if (field.type === "media" && typeof value === "string") {
    const media = getStore().media.find((item) => item.id === value && item.projectId === projectId);
    return media ? withMediaStats(media) : null;
  }
  if (field.type === "reference" && typeof value === "string") {
    return buildEntryReference(value, projectId);
  }
  return value;
}
function deriveEntryTitle(model, fields, fallback) {
  var _a;
  const titleKey = model.titleFieldKey || ((_a = model.fields.find((field) => field.isTitle)) == null ? void 0 : _a.key);
  if (titleKey) {
    const titleValue = fields[titleKey];
    if (typeof titleValue === "string" && titleValue.trim()) {
      return titleValue.trim();
    }
  }
  return (fallback == null ? void 0 : fallback.trim()) || `${model.name} Entry`;
}
function deriveEntrySlug(model, fields, title, fallback) {
  const slugKey = model.slugFieldKey;
  if (slugKey) {
    const slugValue = fields[slugKey];
    if (typeof slugValue === "string" && slugValue.trim()) {
      return slugify(slugValue);
    }
  }
  return slugify(fallback || title) || createId("entry");
}
function createDeliveryItem(entry) {
  const model = getModelOrThrow(entry.modelId, entry.projectId);
  const fields = Object.fromEntries(
    model.fields.sort((left, right) => left.order - right.order).map((field) => [field.apiKey, resolveFieldValue(field, entry.fields[field.key], entry.projectId)])
  );
  return {
    id: entry.id,
    projectId: entry.projectId,
    modelId: model.id,
    modelApiId: model.apiId,
    title: entry.title,
    slug: entry.slug,
    status: entry.status,
    publishedAt: entry.publishedAt,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
    fields
  };
}
function touchProject(projectId) {
  const store = getStore();
  const project = getProjectOrThrow(projectId);
  const next = {
    ...project,
    updatedAt: nowIso()
  };
  const index = store.projects.findIndex((item) => item.id === projectId);
  store.projects.splice(index, 1, next);
}
function touchProjectWebhooks(projectId, eventName) {
  const store = getStore();
  const timestamp = nowIso();
  store.webhooks = store.webhooks.map((webhook) => {
    if (webhook.projectId !== projectId || webhook.status !== "active" || !webhook.events.includes(eventName)) {
      return webhook;
    }
    return {
      ...webhook,
      lastDeliveredAt: timestamp,
      lastStatusCode: 202,
      failureCount: 0,
      updatedAt: timestamp
    };
  });
  touchProject(projectId);
}
function getAuthSession(scope) {
  if (!scope.sessionId) {
    return null;
  }
  try {
    return buildAuthSession(getSessionRecordOrThrow(scope.sessionId));
  } catch {
    return null;
  }
}
function listLoginOptions() {
  return {
    accounts: getStore().users.map((user) => ({
      name: user.name,
      email: user.email,
      title: user.title
    })),
    passwordHint: "demo-pass"
  };
}
function login(input, password) {
  const email = typeof input === "string" ? input : input.email;
  const secret = typeof input === "string" ? "" : input.password;
  const user = getStore().users.find((item) => item.email === email.trim().toLowerCase());
  if (!user || user.password !== secret) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid login credentials."
    });
  }
  const membership = getStore().memberships.find((item) => item.userId === user.id);
  const session = {
    id: createId("sess"),
    userId: user.id,
    activeProjectId: (membership == null ? void 0 : membership.projectId) || null,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  getStore().sessions = getStore().sessions.filter((item) => item.userId !== user.id);
  getStore().sessions.unshift(session);
  return buildAuthSession(session);
}
function logout(scope) {
  const sessionId = typeof scope === "string" ? scope : scope == null ? void 0 : scope.sessionId;
  if (!sessionId) {
    return { success: true };
  }
  getStore().sessions = getStore().sessions.filter((item) => item.id !== sessionId);
  return { success: true };
}
function switchProject(projectIdOrSessionId, scopeOrProjectId) {
  const store = getStore();
  const sessionId = typeof scopeOrProjectId === "string" ? projectIdOrSessionId : getSessionIdFromScope(scopeOrProjectId);
  const projectId = typeof scopeOrProjectId === "string" ? scopeOrProjectId : projectIdOrSessionId;
  const session = getSessionRecordOrThrow(sessionId);
  ensureMemberProject(projectId, session.userId);
  const next = {
    ...session,
    activeProjectId: projectId,
    updatedAt: nowIso()
  };
  const index = store.sessions.findIndex((item) => item.id === sessionId);
  store.sessions.splice(index, 1, next);
  touchProject(projectId);
  return buildAuthSession(next);
}
function listProjects(filters = {}, scope) {
  var _a;
  const { q } = filters;
  const userId = getUserIdFromScope(scope);
  const currentProjectId = ((_a = getAuthSession(scope)) == null ? void 0 : _a.activeProjectId) || null;
  return getStore().memberships.filter((item) => item.userId === userId).map((item) => buildProjectSnapshot(item.projectId, userId, currentProjectId)).filter((project) => matchesSearch(`${project.name} ${project.slug} ${project.description}`, q)).sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}
function getProjectById(id, scope) {
  var _a;
  const userId = getUserIdFromScope(scope);
  const currentProjectId = ((_a = getAuthSession(scope)) == null ? void 0 : _a.activeProjectId) || null;
  ensureMemberProject(id, userId);
  return {
    ...buildProjectSnapshot(id, userId, currentProjectId),
    members: buildProjectMembers(id),
    invites: listInvites({ projectId: id }, scope),
    webhooks: listWebhooks(scope, { projectId: id })
  };
}
function createProject(input, scope) {
  var _a, _b;
  const userId = getUserIdFromScope(scope);
  const store = getStore();
  const timestamp = nowIso();
  const name = ((_a = input.name) == null ? void 0 : _a.trim()) || "Untitled Project";
  const project = {
    id: input.id || createId("prj"),
    name,
    slug: slugify(input.slug || name) || createId("project"),
    description: ((_b = input.description) == null ? void 0 : _b.trim()) || "",
    environment: input.environment || "staging",
    role: "owner",
    memberCount: 1,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp
  };
  store.projects.unshift(project);
  store.memberships.unshift({
    id: createId("pm"),
    projectId: project.id,
    userId,
    role: "owner",
    joinedAt: timestamp,
    updatedAt: timestamp
  });
  const sessionId = getSessionIdFromScope(scope);
  const session = getSessionRecordOrThrow(sessionId);
  session.activeProjectId = project.id;
  session.updatedAt = timestamp;
  return buildProjectSnapshot(project.id, userId, project.id);
}
function updateProject(id, input, scope) {
  var _a;
  const store = getStore();
  const userId = getUserIdFromScope(scope);
  ensureProjectManager(id, userId);
  const current = getProjectOrThrow(id);
  const next = {
    ...clone(current),
    ...clone(input),
    id: current.id,
    slug: slugify(input.slug || current.slug) || current.slug,
    updatedAt: nowIso()
  };
  const index = store.projects.findIndex((project) => project.id === id);
  store.projects.splice(index, 1, next);
  return buildProjectSnapshot(id, userId, ((_a = getAuthSession(scope)) == null ? void 0 : _a.activeProjectId) || null);
}
function listInvites(filters = {}, scope) {
  const { status, email } = filters;
  const projectId = filters.projectId || getProjectIdFromScope(scope);
  return sortByUpdatedAt(getStore().invites).filter((invite) => invite.projectId === projectId).filter((invite) => !status || invite.status === status).filter((invite) => !email || invite.email === email).map((invite) => clone(invite));
}
function createInvite(input, scope) {
  var _a;
  const projectId = input.projectId || getProjectIdFromScope(scope);
  const userId = getUserIdFromScope(scope);
  ensureProjectManager(projectId, userId);
  const store = getStore();
  const project = getProjectOrThrow(projectId);
  const email = (_a = input.email) == null ? void 0 : _a.trim().toLowerCase();
  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invite email is required."
    });
  }
  const existingMember = store.users.find((user) => user.email === email);
  if (existingMember && getMembership(projectId, existingMember.id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "This user already belongs to the project."
    });
  }
  const pending = store.invites.find((invite2) => invite2.projectId === projectId && invite2.email === email && invite2.status === "pending");
  if (pending) {
    throw createError({
      statusCode: 400,
      statusMessage: "A pending invite already exists for this email."
    });
  }
  const timestamp = nowIso();
  const invite = {
    id: input.id || createId("inv"),
    projectId,
    projectName: project.name,
    email,
    role: input.role || "editor",
    status: "pending",
    token: input.token || createId("invite"),
    invitedByUserId: userId,
    createdAt: timestamp,
    updatedAt: timestamp,
    acceptedAt: null
  };
  store.invites.unshift(invite);
  touchProject(projectId);
  return clone(invite);
}
function revokeInvite(id, scope) {
  const userId = getUserIdFromScope(scope);
  const store = getStore();
  const current = getInviteOrThrow(id);
  ensureProjectManager(current.projectId, userId);
  const next = {
    ...clone(current),
    status: "revoked",
    updatedAt: nowIso()
  };
  const index = store.invites.findIndex((invite) => invite.id === id);
  store.invites.splice(index, 1, next);
  touchProject(current.projectId);
  return clone(next);
}
function acceptInvite(token, scope) {
  const store = getStore();
  const sessionId = typeof scope === "string" ? scope : getSessionIdFromScope(scope);
  const session = getSessionRecordOrThrow(sessionId);
  const current = getInviteByTokenOrThrow(token);
  const user = getUserOrThrow(session.userId);
  if (current.email !== user.email) {
    throw createError({
      statusCode: 403,
      statusMessage: "This invite does not belong to the current user."
    });
  }
  if (current.status !== "pending") {
    throw createError({
      statusCode: 400,
      statusMessage: "This invite is no longer pending."
    });
  }
  if (!getMembership(current.projectId, user.id)) {
    store.memberships.unshift({
      id: createId("pm"),
      projectId: current.projectId,
      userId: user.id,
      role: current.role,
      joinedAt: nowIso(),
      updatedAt: nowIso()
    });
  }
  const inviteIndex = store.invites.findIndex((invite) => invite.id === current.id);
  store.invites.splice(inviteIndex, 1, {
    ...current,
    status: "accepted",
    acceptedAt: nowIso(),
    updatedAt: nowIso()
  });
  const sessionIndex = store.sessions.findIndex((item) => item.id === sessionId);
  const nextSession = {
    ...session,
    activeProjectId: current.projectId,
    updatedAt: nowIso()
  };
  store.sessions.splice(sessionIndex, 1, nextSession);
  touchProject(current.projectId);
  return buildAuthSession(nextSession);
}
function listWebhooks(scope, filters = {}) {
  const { status } = filters;
  const projectId = filters.projectId || getProjectIdFromScope(scope);
  return sortByUpdatedAt(getStore().webhooks).filter((webhook) => webhook.projectId === projectId).filter((webhook) => !status || webhook.status === status).map((webhook) => clone(webhook));
}
function createWebhook(input, scope) {
  var _a, _b, _c;
  const store = getStore();
  const timestamp = nowIso();
  const projectId = input.projectId || getProjectIdFromScope(scope);
  const webhook = {
    id: input.id || createId("wh"),
    projectId,
    name: ((_a = input.name) == null ? void 0 : _a.trim()) || "Untitled webhook",
    url: ((_b = input.url) == null ? void 0 : _b.trim()) || "https://example.com/webhook",
    status: input.status || "active",
    events: ((_c = input.events) == null ? void 0 : _c.length) ? input.events : ["entry.published"],
    secret: input.secret || `whsec_${Math.random().toString(36).slice(2, 16)}`,
    lastDeliveredAt: input.lastDeliveredAt || null,
    lastStatusCode: input.lastStatusCode || null,
    failureCount: input.failureCount || 0,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp
  };
  store.webhooks.unshift(webhook);
  touchProject(projectId);
  return clone(webhook);
}
function updateWebhook(id, input, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const current = getWebhookOrThrow(id, projectId);
  const next = {
    ...clone(current),
    ...clone(input),
    id: current.id,
    projectId: current.projectId,
    secret: current.secret,
    updatedAt: nowIso()
  };
  const index = store.webhooks.findIndex((webhook) => webhook.id === id);
  store.webhooks.splice(index, 1, next);
  touchProject(projectId);
  return clone(next);
}
function deleteWebhook(id, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const current = getWebhookOrThrow(id, projectId);
  store.webhooks = store.webhooks.filter((webhook) => webhook.id !== id);
  touchProject(projectId);
  return clone(current);
}
function deliverWebhook(id, scope, eventName) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const current = getWebhookOrThrow(id, projectId);
  const timestamp = nowIso();
  const isActive = current.status === "active";
  const next = {
    ...clone(current),
    lastDeliveredAt: timestamp,
    lastStatusCode: isActive ? 202 : 409,
    lastEvent: eventName || current.lastEvent || null,
    failureCount: isActive ? 0 : current.failureCount + 1,
    updatedAt: timestamp
  };
  const index = store.webhooks.findIndex((webhook) => webhook.id === id);
  store.webhooks.splice(index, 1, next);
  touchProject(projectId);
  return clone(next);
}
function listModels(filters = {}, scope) {
  const { q } = filters;
  const projectId = getProjectIdFromScope(scope);
  return sortByUpdatedAt(getStore().models).filter((model) => model.projectId === projectId).filter((model) => matchesSearch(`${model.name} ${model.apiId} ${model.description}`, q)).map((model) => clone(model));
}
function getModelById(id, scope) {
  const projectId = getProjectIdFromScope(scope);
  return clone(getModelOrThrow(id, projectId));
}
function createModel(input, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const model = normalizeModelPayload(input, projectId);
  store.models.unshift(model);
  touchProjectWebhooks(projectId, "model.updated");
  return clone(model);
}
function updateModel(id, input, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const current = getModelOrThrow(id, projectId);
  const next = normalizeModelPayload({
    ...current,
    ...clone(input),
    id: current.id,
    createdAt: current.createdAt
  }, projectId);
  const index = store.models.findIndex((model) => model.id === id);
  store.models.splice(index, 1, next);
  touchProjectWebhooks(projectId, "model.updated");
  return clone(next);
}
function deleteModel(id, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const current = getModelOrThrow(id, projectId);
  store.models = store.models.filter((model) => model.id !== id);
  store.entries = store.entries.filter((entry) => entry.modelId !== id);
  touchProjectWebhooks(projectId, "model.updated");
  return clone(current);
}
function listEntries(filters = {}, scope) {
  const { q, modelId, status } = filters;
  const projectId = getProjectIdFromScope(scope);
  return sortByUpdatedAt(getStore().entries).filter((entry) => entry.projectId === projectId).filter((entry) => !modelId || entry.modelId === modelId).filter((entry) => !status || entry.status === status).filter((entry) => matchesSearch(`${entry.title} ${entry.slug}`, q)).map((entry) => clone(entry));
}
function getEntryById(id, scope) {
  const projectId = getProjectIdFromScope(scope);
  return clone(getEntryOrThrow(id, projectId));
}
function createEntry(input, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const model = getModelOrThrow(input.modelId || "", projectId);
  const fields = clone(input.fields || {});
  const title = deriveEntryTitle(model, fields, input.title);
  const status = input.status || "draft";
  const entry = {
    id: input.id || createId("ent"),
    projectId,
    modelId: model.id,
    title,
    slug: deriveEntrySlug(model, fields, title, input.slug),
    status,
    fields,
    publishedAt: status === "published" ? input.publishedAt || nowIso() : null,
    createdAt: input.createdAt || nowIso(),
    updatedAt: nowIso()
  };
  store.entries.unshift(entry);
  touchProjectWebhooks(projectId, status === "published" ? "entry.published" : "entry.updated");
  return clone(entry);
}
function updateEntry(id, input, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const current = getEntryOrThrow(id, projectId);
  const model = getModelOrThrow(input.modelId || current.modelId, projectId);
  const fields = {
    ...clone(current.fields),
    ...clone(input.fields || {})
  };
  const status = input.status || current.status;
  const title = deriveEntryTitle(model, fields, input.title || current.title);
  const next = {
    ...clone(current),
    ...clone(input),
    projectId,
    modelId: model.id,
    title,
    slug: deriveEntrySlug(model, fields, title, input.slug || current.slug),
    status,
    fields,
    publishedAt: status === "published" ? input.publishedAt || current.publishedAt || nowIso() : null,
    updatedAt: nowIso()
  };
  const index = store.entries.findIndex((entry) => entry.id === id);
  store.entries.splice(index, 1, next);
  touchProjectWebhooks(projectId, status === "published" ? "entry.published" : "entry.updated");
  return clone(next);
}
function deleteEntry(id, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const current = getEntryOrThrow(id, projectId);
  store.entries = store.entries.filter((entry) => entry.id !== id);
  touchProjectWebhooks(projectId, "entry.deleted");
  return clone(current);
}
function listMedia(filters = {}, scope) {
  const { q, tag } = filters;
  const projectId = getProjectIdFromScope(scope);
  return sortByUpdatedAt(getStore().media).filter((item) => item.projectId === projectId).filter((item) => matchesSearch(`${item.fileName} ${item.alt} ${item.description}`, q)).filter((item) => !tag || item.tags.includes(tag)).map((item) => withMediaStats(item));
}
function getMediaById(id, scope) {
  const projectId = getProjectIdFromScope(scope);
  return withMediaStats(getMediaOrThrow(id, projectId));
}
function createMedia(input, scope) {
  var _a, _b, _c;
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const timestamp = nowIso();
  const fileName = ((_a = input.fileName) == null ? void 0 : _a.trim()) || `mock-${createId("asset")}.png`;
  const item = {
    id: input.id || createId("med"),
    projectId,
    fileName,
    url: input.url || `https://placehold.co/1200x720/111111/FFFFFF/png?text=${encodeURIComponent(fileName)}`,
    mimeType: input.mimeType || "image/png",
    size: input.size || 15e4,
    alt: ((_b = input.alt) == null ? void 0 : _b.trim()) || fileName,
    description: ((_c = input.description) == null ? void 0 : _c.trim()) || "",
    tags: input.tags || [],
    linkedEntryCount: 0,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp
  };
  store.media.unshift(item);
  touchProjectWebhooks(projectId, "media.updated");
  return withMediaStats(item);
}
function updateMedia(id, input, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const current = getMediaOrThrow(id, projectId);
  const next = {
    ...clone(current),
    ...clone(input),
    id: current.id,
    projectId: current.projectId,
    updatedAt: nowIso(),
    linkedEntryCount: current.linkedEntryCount
  };
  const index = store.media.findIndex((item) => item.id === id);
  store.media.splice(index, 1, next);
  touchProjectWebhooks(projectId, "media.updated");
  return withMediaStats(next);
}
function deleteMedia(id, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const current = getMediaOrThrow(id, projectId);
  store.media = store.media.filter((item) => item.id !== id);
  touchProjectWebhooks(projectId, "media.updated");
  return withMediaStats(current);
}
function listApiTokens(filters = {}, scope) {
  const { type, status } = filters;
  const projectId = getProjectIdFromScope(scope);
  return sortByUpdatedAt(getStore().tokens).filter((token) => token.projectId === projectId).filter((token) => !type || token.type === type).filter((token) => !status || token.status === status).map((token) => clone(token));
}
function getTokenById(id, scope) {
  const projectId = getProjectIdFromScope(scope);
  return clone(getTokenOrThrow(id, projectId));
}
function createApiToken(input, scope) {
  var _a;
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const timestamp = nowIso();
  const type = input.type || "delivery";
  const token = {
    id: input.id || createId("tok"),
    projectId,
    name: ((_a = input.name) == null ? void 0 : _a.trim()) || `${type} token`,
    token: input.token || `ctf_${type === "delivery" ? "deliv" : "mgmt"}_${Math.random().toString(36).slice(2, 14)}`,
    type,
    status: input.status || "active",
    scopes: input.scopes || (type === "delivery" ? ["content:read", "media:read"] : ["models:write", "entries:write", "media:write"]),
    lastUsedAt: input.lastUsedAt || null,
    expiresAt: input.expiresAt || null,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp
  };
  store.tokens.unshift(token);
  touchProject(projectId);
  return clone(token);
}
function updateApiToken(id, input, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const current = getTokenOrThrow(id, projectId);
  const next = {
    ...clone(current),
    ...clone(input),
    id: current.id,
    projectId: current.projectId,
    token: current.token,
    updatedAt: nowIso()
  };
  const index = store.tokens.findIndex((token) => token.id === id);
  store.tokens.splice(index, 1, next);
  touchProject(projectId);
  return clone(next);
}
function deleteApiToken(id, scope) {
  const store = getStore();
  const projectId = getProjectIdFromScope(scope);
  const current = getTokenOrThrow(id, projectId);
  store.tokens = store.tokens.filter((token) => token.id !== id);
  touchProject(projectId);
  return clone(current);
}
function listDeliveryContent(modelApiId, scope, query) {
  const projectId = typeof scope === "string" ? scope : scope ? getScopedProjectId(scope.sessionId, scope.projectId) : void 0;
  const matches = getStore().models.filter((item) => item.apiId === modelApiId).filter((item) => !projectId || item.projectId === projectId);
  if (!matches.length) {
    throw createError({
      statusCode: 404,
      statusMessage: `Model apiId ${modelApiId} was not found.`
    });
  }
  if (matches.length > 1 && !projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: `Project scope is required for model apiId ${modelApiId}.`
    });
  }
  const model = matches[0];
  return sortByUpdatedAt(getStore().entries).filter((entry) => entry.projectId === model.projectId).filter((entry) => entry.modelId === model.id).filter((entry) => entry.status === "published").filter((entry) => matchesSearch(`${entry.title} ${entry.slug}`, query)).map((entry) => createDeliveryItem(entry));
}
function getDeliveryContent(modelApiId, entryId, scope) {
  const item = listDeliveryContent(modelApiId, scope).find((entry) => entry.id === entryId);
  if (!item) {
    throw createError({
      statusCode: 404,
      statusMessage: `Published entry ${entryId} was not found.`
    });
  }
  return item;
}
function getDashboard(scope) {
  const session = getAuthSession(scope);
  const projectId = getProjectIdFromScope(scope);
  const recentModels = listModels({}, projectId).slice(0, 5);
  const recentEntries = listEntries({}, projectId).slice(0, 5);
  const recentMedia = listMedia({}, projectId).slice(0, 5);
  const tokens = listApiTokens({}, projectId);
  const webhooks = listWebhooks(projectId);
  const project = (session == null ? void 0 : session.user) ? buildProjectSnapshot(projectId, session.user.id, session.activeProjectId || null) : null;
  return {
    project,
    counts: {
      models: recentModels.length ? getProjectCounts(projectId).modelCount : getProjectCounts(projectId).modelCount,
      entries: getProjectCounts(projectId).entryCount,
      media: getProjectCounts(projectId).mediaCount,
      tokens: tokens.length,
      webhooks: webhooks.length
    },
    recentModels,
    recentEntries,
    recentMedia,
    pendingInvites: (session == null ? void 0 : session.pendingInvites) || []
  };
}

const warnOnceSet = /* @__PURE__ */ new Set();
const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _mmEBX3 = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola$1.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  } else {
    if (collectionName && !warnOnceSet.has(collectionName) && apiEndPoint === DEFAULT_ENDPOINT) {
      consola$1.warn([
        `[Icon] Collection \`${collectionName}\` is not found locally`,
        `We suggest to install it via \`npm i -D @iconify-json/${collectionName}\` to provide the best end-user experience.`
      ].join("\n"));
      warnOnceSet.add(collectionName);
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola$1.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola$1.error(e);
      if (e.status === 404)
        return createError({ status: 404 });
      else
        return createError({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery$1(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash$1(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _lazy_YoAS_j = () => Promise.resolve().then(function () { return requestContext; });
const _lazy_nlqUnm = () => Promise.resolve().then(function () { return index_get$j; });
const _lazy_koc8vm = () => Promise.resolve().then(function () { return _id__delete$b; });
const _lazy_psbedL = () => Promise.resolve().then(function () { return _id__get$b; });
const _lazy_LK3Mb5 = () => Promise.resolve().then(function () { return _id__patch$b; });
const _lazy_fWKha4 = () => Promise.resolve().then(function () { return index_get$h; });
const _lazy_aOLOsv = () => Promise.resolve().then(function () { return index_post$d; });
const _lazy_AObH5K = () => Promise.resolve().then(function () { return _id__delete$9; });
const _lazy_1FpLjs = () => Promise.resolve().then(function () { return accept_post$3; });
const _lazy_NwFmXe = () => Promise.resolve().then(function () { return index_get$f; });
const _lazy_WsFs2y = () => Promise.resolve().then(function () { return index_post$b; });
const _lazy_qvjIVO = () => Promise.resolve().then(function () { return _id__delete$7; });
const _lazy_IjcUgA = () => Promise.resolve().then(function () { return _id__get$9; });
const _lazy_cXcsbp = () => Promise.resolve().then(function () { return _id__patch$9; });
const _lazy_nvelR_ = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_VtsHp3 = () => Promise.resolve().then(function () { return index_post$9; });
const _lazy_AtMPjY = () => Promise.resolve().then(function () { return _id__delete$5; });
const _lazy_7vBgWz = () => Promise.resolve().then(function () { return _id__get$7; });
const _lazy_pMkFKX = () => Promise.resolve().then(function () { return _id__patch$7; });
const _lazy_sHE8Zy = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_ID2wKH = () => Promise.resolve().then(function () { return index_post$7; });
const _lazy_kpfj5O = () => Promise.resolve().then(function () { return _id__get$5; });
const _lazy_1es4xk = () => Promise.resolve().then(function () { return _id__patch$5; });
const _lazy_pMlzas = () => Promise.resolve().then(function () { return switch_post$1; });
const _lazy_YqHRQa = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_YVsF4c = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_aVWxHh = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_8erxoE = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_B1TWT3 = () => Promise.resolve().then(function () { return _id__patch$3; });
const _lazy_L6jpq5 = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_UwCOqq = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_rxrUZt = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_o8SeNM = () => Promise.resolve().then(function () { return _id__patch$1; });
const _lazy_PCACfE = () => Promise.resolve().then(function () { return deliver_post$1; });
const _lazy_ghr6pE = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_FlNu9w = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_3R2EZ_ = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_jju5Y6 = () => Promise.resolve().then(function () { return logout_post$1; });
const _lazy_WJTv4d = () => Promise.resolve().then(function () { return options_get$1; });
const _lazy_wPLvA4 = () => Promise.resolve().then(function () { return session_get$1; });
const _lazy_E1Z_7y = () => Promise.resolve().then(function () { return _entryId__get$1; });
const _lazy_K1c62b = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_e87iFG = () => Promise.resolve().then(function () { return accept_post$1; });
const _lazy_bcamxt = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_R82weO = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_8wXjr9 = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _bkfAKF, lazy: false, middleware: true, method: undefined },
  { route: '/api/_utils/request-context', handler: _lazy_YoAS_j, lazy: true, middleware: false, method: undefined },
  { route: '/api/v1/admin/dashboard', handler: _lazy_nlqUnm, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/entries/:id', handler: _lazy_koc8vm, lazy: true, middleware: false, method: "delete" },
  { route: '/api/v1/admin/entries/:id', handler: _lazy_psbedL, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/entries/:id', handler: _lazy_LK3Mb5, lazy: true, middleware: false, method: "patch" },
  { route: '/api/v1/admin/entries', handler: _lazy_fWKha4, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/entries', handler: _lazy_aOLOsv, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/admin/invites/:id', handler: _lazy_AObH5K, lazy: true, middleware: false, method: "delete" },
  { route: '/api/v1/admin/invites/:id/accept', handler: _lazy_1FpLjs, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/admin/invites', handler: _lazy_NwFmXe, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/invites', handler: _lazy_WsFs2y, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/admin/media/:id', handler: _lazy_qvjIVO, lazy: true, middleware: false, method: "delete" },
  { route: '/api/v1/admin/media/:id', handler: _lazy_IjcUgA, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/media/:id', handler: _lazy_cXcsbp, lazy: true, middleware: false, method: "patch" },
  { route: '/api/v1/admin/media', handler: _lazy_nvelR_, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/media', handler: _lazy_VtsHp3, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/admin/models/:id', handler: _lazy_AtMPjY, lazy: true, middleware: false, method: "delete" },
  { route: '/api/v1/admin/models/:id', handler: _lazy_7vBgWz, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/models/:id', handler: _lazy_pMkFKX, lazy: true, middleware: false, method: "patch" },
  { route: '/api/v1/admin/models', handler: _lazy_sHE8Zy, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/models', handler: _lazy_ID2wKH, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/admin/projects/:id', handler: _lazy_kpfj5O, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/projects/:id', handler: _lazy_1es4xk, lazy: true, middleware: false, method: "patch" },
  { route: '/api/v1/admin/projects/:id/switch', handler: _lazy_pMlzas, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/admin/projects', handler: _lazy_YqHRQa, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/projects', handler: _lazy_YVsF4c, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/admin/tokens/:id', handler: _lazy_aVWxHh, lazy: true, middleware: false, method: "delete" },
  { route: '/api/v1/admin/tokens/:id', handler: _lazy_8erxoE, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/tokens/:id', handler: _lazy_B1TWT3, lazy: true, middleware: false, method: "patch" },
  { route: '/api/v1/admin/tokens', handler: _lazy_L6jpq5, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/tokens', handler: _lazy_UwCOqq, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/admin/webhooks/:id', handler: _lazy_rxrUZt, lazy: true, middleware: false, method: "delete" },
  { route: '/api/v1/admin/webhooks/:id', handler: _lazy_o8SeNM, lazy: true, middleware: false, method: "patch" },
  { route: '/api/v1/admin/webhooks/:id/deliver', handler: _lazy_PCACfE, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/admin/webhooks', handler: _lazy_ghr6pE, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/admin/webhooks', handler: _lazy_FlNu9w, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/auth/login', handler: _lazy_3R2EZ_, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/auth/logout', handler: _lazy_jju5Y6, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/auth/options', handler: _lazy_WJTv4d, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/auth/session', handler: _lazy_wPLvA4, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/content/:modelApiId/:entryId', handler: _lazy_E1Z_7y, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/content/:modelApiId', handler: _lazy_K1c62b, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/invites/:token/accept', handler: _lazy_e87iFG, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/media/:id', handler: _lazy_bcamxt, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/media', handler: _lazy_R82weO, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_8wXjr9, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _mmEBX3, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_8wXjr9, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = {
	"appName": "Nuxt",
	"status": 500,
	"statusText": "Internal server error",
	"description": "This page is temporarily unavailable.",
	"refresh": "Refresh this page"
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0\" name=\"viewport\"><script>!function(){const e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(const e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(const o of e)if(\"childList\"===o.type)for(const e of o.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:\"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class=\"antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide\"><div class=\"max-w-520px text-center\"><h1 class=\"font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]\">" + escapeHtml(messages.status) + "</h1><h2 class=\"font-semibold mb-2 sm:text-3xl text-2xl\">" + escapeHtml(messages.statusText) + "</h2><p class=\"mb-4 px-2 text-[#64748B] text-md\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

function getRequestSessionId(event) {
  const query = getQuery$1(event);
  const header = getHeader(event, "x-conteful-session-id");
  const cookie = getCookie(event, "conteful-session-id");
  const raw = header || cookie || (typeof query.sessionId === "string" ? query.sessionId : void 0);
  return (raw == null ? void 0 : raw.trim()) || void 0;
}
function getRequestProjectId(event) {
  const query = getQuery$1(event);
  const header = getHeader(event, "x-conteful-project-id");
  const cookie = getCookie(event, "conteful-project-id");
  const raw = header || cookie || (typeof query.projectId === "string" ? query.projectId : void 0);
  return (raw == null ? void 0 : raw.trim()) || void 0;
}
function getRequestScope(event) {
  return {
    sessionId: getRequestSessionId(event),
    projectId: getRequestProjectId(event)
  };
}

const requestContext = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  getRequestProjectId: getRequestProjectId,
  getRequestScope: getRequestScope,
  getRequestSessionId: getRequestSessionId
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$i = defineEventHandler((event) => {
  return getDashboard(getRequestScope(event));
});

const index_get$j = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$i
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$a = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const item = deleteEntry(id, getRequestScope(event));
  return toMutationResponse(item, "Entry deleted.");
});

const _id__delete$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$a
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$a = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  return toItemResponse(getEntryById(id, getRequestScope(event)));
});

const _id__get$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$a
}, Symbol.toStringTag, { value: 'Module' }));

const _id__patch$a = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") || "";
  const body = await readBody(event);
  const item = updateEntry(id, body, getRequestScope(event));
  return toMutationResponse(item, "Entry updated.");
});

const _id__patch$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__patch$a
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$g = defineEventHandler((event) => {
  const query = getQuery$1(event);
  const q = typeof query.q === "string" ? query.q : void 0;
  const modelId = typeof query.modelId === "string" ? query.modelId : void 0;
  const status = typeof query.status === "string" ? query.status : void 0;
  const scope = getRequestScope(event);
  return toListResponse(listEntries({ q, modelId, status }, scope), {
    q,
    modelId,
    status,
    projectId: scope.projectId
  });
});

const index_get$h = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$g
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$c = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const item = createEntry(body, getRequestScope(event));
  return toMutationResponse(item, "Entry created.");
});

const index_post$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$c
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$8 = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const item = revokeInvite(id, getRequestScope(event));
  return toMutationResponse(item, "Invite revoked.");
});

const _id__delete$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$8
}, Symbol.toStringTag, { value: 'Module' }));

const accept_post$2 = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const item = acceptInvite(id, getRequestScope(event));
  if (item.activeProjectId) {
    setCookie(event, "conteful-project-id", item.activeProjectId, {
      sameSite: "lax",
      path: "/"
    });
  }
  return toMutationResponse(item, "Invite accepted.");
});

const accept_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: accept_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$e = defineEventHandler((event) => {
  const query = getQuery$1(event);
  const status = typeof query.status === "string" ? query.status : void 0;
  const email = typeof query.email === "string" ? query.email : void 0;
  const projectId = typeof query.projectId === "string" ? query.projectId : void 0;
  const scope = getRequestScope(event);
  return toListResponse(listInvites({ status, email, projectId }, scope), {
    status,
    email,
    projectId: projectId || scope.projectId
  });
});

const index_get$f = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$e
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$a = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const item = createInvite(body, getRequestScope(event));
  return toMutationResponse(item, "Invite created.");
});

const index_post$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$a
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$6 = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const item = deleteMedia(id, getRequestScope(event));
  return toMutationResponse(item, "Media deleted.");
});

const _id__delete$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$6
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$8 = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  return toItemResponse(getMediaById(id, getRequestScope(event)));
});

const _id__get$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$8
}, Symbol.toStringTag, { value: 'Module' }));

const _id__patch$8 = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") || "";
  const body = await readBody(event);
  const item = updateMedia(id, body, getRequestScope(event));
  return toMutationResponse(item, "Media updated.");
});

const _id__patch$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__patch$8
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$c = defineEventHandler((event) => {
  const query = getQuery$1(event);
  const q = typeof query.q === "string" ? query.q : void 0;
  const tag = typeof query.tag === "string" ? query.tag : void 0;
  const scope = getRequestScope(event);
  return toListResponse(listMedia({ q, tag }, scope), { q, tag, projectId: scope.projectId });
});

const index_get$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$c
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$8 = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const item = createMedia(body, getRequestScope(event));
  return toMutationResponse(item, "Media created.");
});

const index_post$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$8
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$4 = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const item = deleteModel(id, getRequestScope(event));
  return toMutationResponse(item, "Content model deleted.");
});

const _id__delete$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$4
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$6 = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  return toItemResponse(getModelById(id, getRequestScope(event)));
});

const _id__get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$6
}, Symbol.toStringTag, { value: 'Module' }));

const _id__patch$6 = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") || "";
  const body = await readBody(event);
  const item = updateModel(id, body, getRequestScope(event));
  return toMutationResponse(item, "Content model updated.");
});

const _id__patch$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__patch$6
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$a = defineEventHandler((event) => {
  const query = getQuery$1(event);
  const q = typeof query.q === "string" ? query.q : void 0;
  const scope = getRequestScope(event);
  return toListResponse(listModels({ q }, scope), { q, projectId: scope.projectId });
});

const index_get$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$a
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$6 = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const item = createModel(body, getRequestScope(event));
  return toMutationResponse(item, "Content model created.");
});

const index_post$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$6
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$4 = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  return toItemResponse(getProjectById(id, getRequestScope(event)));
});

const _id__get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$4
}, Symbol.toStringTag, { value: 'Module' }));

const _id__patch$4 = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") || "";
  const body = await readBody(event);
  const item = updateProject(id, body, getRequestScope(event));
  return toMutationResponse(item, "Project updated.");
});

const _id__patch$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__patch$4
}, Symbol.toStringTag, { value: 'Module' }));

const switch_post = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const item = switchProject(id, getRequestScope(event));
  if (item.activeProjectId) {
    setCookie(event, "conteful-project-id", item.activeProjectId, {
      sameSite: "lax",
      path: "/"
    });
  }
  return toMutationResponse(item, "Project switched.");
});

const switch_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: switch_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$8 = defineEventHandler((event) => {
  const query = getQuery$1(event);
  const q = typeof query.q === "string" ? query.q : void 0;
  return toListResponse(listProjects({ q }, getRequestScope(event)), { q });
});

const index_get$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$8
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$4 = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const item = createProject(body, getRequestScope(event));
  return toMutationResponse(item, "Project created.");
});

const index_post$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$4
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$2 = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const item = deleteApiToken(id, getRequestScope(event));
  return toMutationResponse(item, "API token deleted.");
});

const _id__delete$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$2 = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  return toItemResponse(getTokenById(id, getRequestScope(event)));
});

const _id__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__patch$2 = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") || "";
  const body = await readBody(event);
  const item = updateApiToken(id, body, getRequestScope(event));
  return toMutationResponse(item, "API token updated.");
});

const _id__patch$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__patch$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$6 = defineEventHandler((event) => {
  const query = getQuery$1(event);
  const type = typeof query.type === "string" ? query.type : void 0;
  const status = typeof query.status === "string" ? query.status : void 0;
  const scope = getRequestScope(event);
  return toListResponse(listApiTokens({ type, status }, scope), {
    type,
    status,
    projectId: scope.projectId
  });
});

const index_get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$6
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$2 = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const item = createApiToken(body, getRequestScope(event));
  return toMutationResponse(item, "API token created.");
});

const index_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const item = deleteWebhook(id, getRequestScope(event));
  return toMutationResponse(item, "Webhook deleted.");
});

const _id__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete
}, Symbol.toStringTag, { value: 'Module' }));

const _id__patch = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") || "";
  const body = await readBody(event);
  const item = updateWebhook(id, body, getRequestScope(event));
  return toMutationResponse(item, "Webhook updated.");
});

const _id__patch$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__patch
}, Symbol.toStringTag, { value: 'Module' }));

const deliver_post = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const query = getQuery$1(event);
  const eventName = typeof query.event === "string" ? query.event : "entry.updated";
  const item = deliverWebhook(id, getRequestScope(event), eventName);
  return toMutationResponse(item, "Webhook delivery simulated.");
});

const deliver_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: deliver_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$4 = defineEventHandler((event) => {
  return toListResponse(listWebhooks(getRequestScope(event)));
});

const index_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const item = createWebhook(body, getRequestScope(event));
  return toMutationResponse(item, "Webhook created.");
});

const index_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post
}, Symbol.toStringTag, { value: 'Module' }));

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = login(body);
  setCookie(event, "conteful-session-id", session.sessionId, {
    sameSite: "lax",
    path: "/"
  });
  if (session.activeProjectId) {
    setCookie(event, "conteful-project-id", session.activeProjectId, {
      sameSite: "lax",
      path: "/"
    });
  }
  return toMutationResponse(session, "Logged in.");
});

const login_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: login_post
}, Symbol.toStringTag, { value: 'Module' }));

const logout_post = defineEventHandler((event) => {
  const item = logout(getRequestScope(event));
  deleteCookie(event, "conteful-session-id", { path: "/" });
  deleteCookie(event, "conteful-project-id", { path: "/" });
  return toMutationResponse(item, "Logged out.");
});

const logout_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: logout_post
}, Symbol.toStringTag, { value: 'Module' }));

const options_get = defineEventHandler(() => {
  return toItemResponse(listLoginOptions());
});

const options_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: options_get
}, Symbol.toStringTag, { value: 'Module' }));

const session_get = defineEventHandler((event) => {
  return toItemResponse(getAuthSession(getRequestScope(event)));
});

const session_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: session_get
}, Symbol.toStringTag, { value: 'Module' }));

const _entryId__get = defineEventHandler((event) => {
  const modelApiId = getRouterParam(event, "modelApiId") || "";
  const entryId = getRouterParam(event, "entryId") || "";
  const scope = getRequestScope(event);
  return toItemResponse(getDeliveryContent(modelApiId, entryId, scope), {
    modelApiId,
    entryId,
    projectId: scope.projectId
  });
});

const _entryId__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _entryId__get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$2 = defineEventHandler((event) => {
  const modelApiId = getRouterParam(event, "modelApiId") || "";
  const query = getQuery$1(event);
  const q = typeof query.q === "string" ? query.q : void 0;
  const scope = getRequestScope(event);
  return toListResponse(listDeliveryContent(modelApiId, scope, q), {
    modelApiId,
    q,
    projectId: scope.projectId
  });
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const accept_post = defineEventHandler((event) => {
  const token = getRouterParam(event, "token") || "";
  const item = acceptInvite(token, getRequestScope(event));
  if (item.activeProjectId) {
    setCookie(event, "conteful-project-id", item.activeProjectId, {
      sameSite: "lax",
      path: "/"
    });
  }
  return toMutationResponse(item, "Invite accepted.");
});

const accept_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: accept_post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  return toItemResponse(getMediaById(id, getRequestScope(event)));
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler((event) => {
  const query = getQuery$1(event);
  const q = typeof query.q === "string" ? query.q : void 0;
  const tag = typeof query.tag === "string" ? query.tag : void 0;
  const scope = getRequestScope(event);
  return toListResponse(listMedia({ q, tag }, scope), { q, tag, projectId: scope.projectId });
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
	return {
		body: stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"]) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const contents = opts.data ? stringify(opts.data, opts.ssrContext["~payloadReducers"]) : "";
	const payload = {
		"type": "application/json",
		"innerHTML": contents,
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	{
		payload.id = "__NUXT_DATA__";
	}
	if (opts.src) {
		payload["data-src"] = opts.src;
	}
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, ...initial } = ssrContext.payload;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload: {
			data,
			prerenderedAt
		}
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const PAYLOAD_FILENAME = "_payload.json" ;
const renderer = defineRenderHandler(async (event) => {
	const nitroApp = useNitroApp();
	// Whether we're rendering an error page
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) {
		throw createError({
			status: 404,
			statusText: "Page Not Found: /__nuxt_error",
			message: "Page Not Found: /__nuxt_error"
		});
	}
	// Initialize ssr context
	const ssrContext = createSSRContext(event);
	// needed for hash hydration plugin to work
	const headEntryOptions = { mode: "server" };
	ssrContext.head.push(appHead, headEntryOptions);
	if (ssrError) {
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		const status = ssrError.status || ssrError.statusCode;
		if (status) {
			// eslint-disable-next-line @typescript-eslint/no-deprecated
			ssrError.status = ssrError.statusCode = Number.parseInt(status);
		}
		if (typeof ssrError.data === "string") {
			try {
				ssrError.data = destr(ssrError.data);
			} catch {}
		}
		setSSRError(ssrContext, ssrError);
	}
	// Get route options (for `ssr: false`, `isr`, `cache` and `noScripts`)
	const routeOptions = getRouteRules(event);
	// Whether we are prerendering route or using ISR/SWR caching
	const _PAYLOAD_EXTRACTION = !ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const isRenderingPayload = (_PAYLOAD_EXTRACTION || routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
		ssrContext.url = url;
		event._path = event.node.req.url = url;
	}
	if (routeOptions.ssr === false) {
		ssrContext.noSSR = true;
	}
	const payloadURL = _PAYLOAD_EXTRACTION ? joinURL(ssrContext.runtimeConfig.app.cdnURL || ssrContext.runtimeConfig.app.baseURL, ssrContext.url.replace(/\?.*$/, ""), PAYLOAD_FILENAME) + "?" + ssrContext.runtimeConfig.app.buildId : undefined;
	// Render app
	const renderer = await getRenderer(ssrContext);
	const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
		// We use error to bypass full render if we have an early response we can make
		// TODO: remove _renderResponse in nuxt v5
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") {
			return {};
		}
		// Use explicitly thrown error in preference to subsequent rendering errors
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	// Render inline styles
	// TODO: remove _renderResponse in nuxt v5
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) {
		// TODO: remove _renderResponse in nuxt v5
		return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	}
	// Handle errors
	if (ssrContext.payload?.error && !ssrError) {
		throw ssrContext.payload.error;
	}
	// Directly render payload routes
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		return response;
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	// Setup head
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	// 1. Preload payloads and app manifest
	if (_PAYLOAD_EXTRACTION && !NO_SCRIPTS) {
		ssrContext.head.push({ link: [{
			rel: "preload",
			as: "fetch",
			crossorigin: "anonymous",
			href: payloadURL
		} ] }, headEntryOptions);
	}
	if (ssrContext["~preloadManifest"] && !NO_SCRIPTS) {
		ssrContext.head.push({ link: [{
			rel: "preload",
			as: "fetch",
			fetchpriority: "low",
			crossorigin: "anonymous",
			href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`)
		}] }, {
			...headEntryOptions,
			tagPriority: "low"
		});
	}
	// 2. Styles
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const link = [];
	for (const resource of Object.values(styles)) {
		// Do not add links to resources that are inlined (vite v5+)
		if ("inline" in getQuery(resource.file)) {
			continue;
		}
		// Add CSS links in <head> for CSS files
		// - in production
		// - in dev mode when not rendering an island
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) {
		ssrContext.head.push({ link }, headEntryOptions);
	}
	if (!NO_SCRIPTS) {
		// 4. Resource Hints
		// Remove lazy hydrated modules from ssrContext.modules so they don't get preloaded
		// (CSS links are already added above, this only affects JS preloads)
		if (ssrContext["~lazyHydratedModules"]) {
			for (const id of ssrContext["~lazyHydratedModules"]) {
				ssrContext.modules?.delete(id);
			}
		}
		ssrContext.head.push({ link: getPreloadLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		ssrContext.head.push({ link: getPrefetchLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		// 5. Payloads
		ssrContext.head.push({ script: _PAYLOAD_EXTRACTION ? renderPayloadJsonScript({
			ssrContext,
			data: splitPayload(ssrContext).initial,
			src: payloadURL
		})  : renderPayloadJsonScript({
			ssrContext,
			data: ssrContext.payload
		})  }, {
			...headEntryOptions,
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	// 6. Scripts
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			tagPosition,
			crossorigin: ""
		})) }, headEntryOptions);
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	// Create render context
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	// Allow hooking into the rendered result
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	// Construct HTML response
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
});
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) {
			result.push(chunk);
		}
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) {
		return "";
	}
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return "<!DOCTYPE html>" + `<html${joinAttrs(html.htmlAttrs)}>` + `<head>${joinTags(html.head)}</head>` + `<body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>` + "</html>";
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
