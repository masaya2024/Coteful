import { u as useLocale, a as useWorkspaceSession, e as __nuxt_component_0$1, _ as __nuxt_component_1$1 } from './server.mjs';
import { _ as __nuxt_component_1 } from './InquiryComposer-DOemh6Ob.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
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
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useLocale();
    const { isAuthenticated } = useWorkspaceSession();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      const _component_InquiryComposer = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_460px] lg:p-6" }, _attrs))}><section class="hard-panel px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"><p class="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-black/45">${ssrInterpolate(unref(t)("contact.publicEyebrow"))}</p><h1 class="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-black md:text-5xl">${ssrInterpolate(unref(t)("contact.publicTitle"))}</h1><p class="mt-4 max-w-2xl text-sm leading-7 text-black/58">${ssrInterpolate(unref(t)("contact.publicDescription"))}</p><div class="mt-8 flex flex-wrap gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "action-button",
        "data-variant": "solid",
        to: unref(isAuthenticated) ? "/support" : "/login"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: unref(isAuthenticated) ? "lucide:life-buoy" : "lucide:log-in",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(isAuthenticated) ? unref(t)("contact.memberShortcut") : unref(t)("public.login"))}`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: unref(isAuthenticated) ? "lucide:life-buoy" : "lucide:log-in",
                size: "16"
              }, null, 8, ["name"]),
              createTextVNode(" " + toDisplayString(unref(isAuthenticated) ? unref(t)("contact.memberShortcut") : unref(t)("public.login")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-10 rounded-3xl border border-black/10 bg-white/78 px-5 py-5"><p class="text-xs uppercase tracking-[0.2em] text-black/38">${ssrInterpolate(unref(t)("contact.responseTitle"))}</p><p class="mt-3 text-sm leading-7 text-black/58">${ssrInterpolate(unref(t)("contact.responseBodyPublic"))}</p></div></section>`);
      _push(ssrRenderComponent(_component_InquiryComposer, { mode: "public" }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-CJjfdAXo.mjs.map
