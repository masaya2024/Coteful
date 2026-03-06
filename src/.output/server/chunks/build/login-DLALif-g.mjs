import { u as useLocale, a as useWorkspaceSession, d as useAsyncData, _ as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, withAsyncContext, reactive, ref, computed, watchEffect, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "login",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useLocale();
    useWorkspaceSession();
    const { data: loginOptions } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("login-options", () => {
      return $fetch("/api/v1/auth/options");
    })), __temp = await __temp, __restore(), __temp);
    const form = reactive({
      email: "",
      password: ""
    });
    const submitError = ref("");
    const submitting = ref(false);
    const demoAccounts = computed(() => loginOptions.value?.item.accounts || []);
    const passwordHint = computed(() => loginOptions.value?.item.passwordHint || "demo-pass");
    watchEffect(() => {
      if (!form.email && demoAccounts.value[0]?.email) {
        form.email = demoAccounts.value[0].email;
        form.password = passwordHint.value;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-grid lg:grid-cols-[minmax(0,1.05fr)_420px] lg:p-6" }, _attrs))}><section class="auth-surface hard-panel px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"><p class="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-black/45"> Conteful </p><h1 class="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-black md:text-5xl">${ssrInterpolate(unref(t)("auth.title"))}</h1><p class="mt-4 max-w-2xl text-sm leading-7 text-black/58">${ssrInterpolate(unref(t)("auth.description"))}</p><div class="mt-10 grid gap-4 md:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(demoAccounts), (account) => {
        _push(`<button class="text-left border border-black/10 bg-white px-4 py-4 transition hover:border-black/35" type="button"><p class="text-xs uppercase tracking-[0.2em] text-black/35">${ssrInterpolate(account.title)}</p><p class="mt-3 font-medium text-black">${ssrInterpolate(account.name)}</p><p class="mt-2 text-sm text-black/58">${ssrInterpolate(account.email)}</p></button>`);
      });
      _push(`<!--]--></div><div class="mt-8 rounded-3xl border border-black/10 bg-white/75 px-5 py-5"><p class="text-xs uppercase tracking-[0.2em] text-black/38">${ssrInterpolate(unref(t)("auth.demoTitle"))}</p><p class="mt-3 text-sm leading-7 text-black/58">${ssrInterpolate(unref(t)("auth.demoMessage"))}</p><p class="mt-3 font-mono text-sm text-black/72">${ssrInterpolate(unref(passwordHint))}</p></div></section><section class="hard-panel px-6 py-8 md:px-8 md:py-10"><p class="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-black/42">${ssrInterpolate(unref(t)("auth.signInEyebrow"))}</p><h2 class="mt-4 text-3xl font-semibold tracking-[-0.05em] text-black">${ssrInterpolate(unref(t)("auth.signInTitle"))}</h2><p class="mt-3 text-sm leading-7 text-black/58">${ssrInterpolate(unref(t)("auth.signInDescription"))}</p><form class="mt-8 space-y-4"><label class="block space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("auth.email"))}</span><input${ssrRenderAttr("value", unref(form).email)} class="form-input" type="email" autocomplete="email"></label><label class="block space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("auth.password"))}</span><input${ssrRenderAttr("value", unref(form).password)} class="form-input" type="password" autocomplete="current-password"></label>`);
      if (unref(submitError)) {
        _push(`<div class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">${ssrInterpolate(unref(submitError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="action-button w-full" data-variant="solid" type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:log-in",
        size: "16"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(t)("auth.submit"))}</button></form></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DLALif-g.mjs.map
