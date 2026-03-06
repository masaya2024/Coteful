import { _ as __nuxt_component_0 } from './PageHeading-CcJIC8pa.mjs';
import { g as useRoute, u as useLocale, d as useAsyncData, c as createError, _ as __nuxt_component_1$1, n as navigateTo } from './server.mjs';
import { _ as __nuxt_component_2 } from './MediaForm-BLhlDTSV.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useCmsAdmin, f as formatDateTime, a as formatBytes } from './useCmsAdmin-JU0iaKpB.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { adminRepository } = useCmsAdmin();
    const { t } = useLocale();
    const { data, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`media:${route.params.id}`, () => adminRepository.getMedia(String(route.params.id)))), __temp = await __temp, __restore(), __temp);
    if (!data.value?.item) {
      throw createError({ statusCode: 404, statusMessage: t("error.mediaNotFound") });
    }
    async function submit(payload) {
      await adminRepository.updateMedia(String(route.params.id), payload);
      await refresh();
    }
    async function removeMedia() {
      await adminRepository.deleteMedia(String(route.params.id));
      await navigateTo("/media");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeading = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1$1;
      const _component_MediaForm = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeading, {
        eyebrow: unref(t)("media.detail.eyebrow"),
        title: unref(data).item.fileName,
        description: `${unref(t)("media.detail.updatedPrefix")} ${unref(formatDateTime)(unref(data).item.updatedAt)}`
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="action-button text-red-700" type="button"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:trash-2",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(t)("media.detail.delete"))}</button>`);
          } else {
            return [
              createVNode("button", {
                class: "action-button text-red-700",
                type: "button",
                onClick: removeMedia
              }, [
                createVNode(_component_Icon, {
                  name: "lucide:trash-2",
                  size: "16"
                }),
                createTextVNode(" " + toDisplayString(unref(t)("media.detail.delete")), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_360px]">`);
      _push(ssrRenderComponent(_component_MediaForm, {
        media: unref(data).item,
        "submit-label": unref(t)("mediaForm.save"),
        onSubmit: submit
      }, null, _parent));
      _push(`<aside class="space-y-6"><article class="hard-panel space-y-4 px-5 py-5"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">${ssrInterpolate(unref(t)("media.detail.snapshot"))}</p><div class="space-y-3 text-sm leading-6 text-black/62"><p><span class="font-medium text-black">${ssrInterpolate(unref(t)("media.detail.mime"))}</span><br>${ssrInterpolate(unref(data).item.mimeType)}</p><p><span class="font-medium text-black">${ssrInterpolate(unref(t)("media.detail.size"))}</span><br>${ssrInterpolate(unref(formatBytes)(unref(data).item.size))}</p><p><span class="font-medium text-black">${ssrInterpolate(unref(t)("media.detail.url"))}</span><br><code>${ssrInterpolate(unref(data).item.url)}</code></p><p><span class="font-medium text-black">${ssrInterpolate(unref(t)("media.detail.created"))}</span><br>${ssrInterpolate(unref(formatDateTime)(unref(data).item.createdAt))}</p></div></article></aside></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-Dmi4HfPF.mjs.map
