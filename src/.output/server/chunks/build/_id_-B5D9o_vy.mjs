import { _ as __nuxt_component_0 } from './PageHeading-CcJIC8pa.mjs';
import { g as useRoute, u as useLocale, d as useAsyncData, c as createError, _ as __nuxt_component_1$1, e as __nuxt_component_0$1, n as navigateTo } from './server.mjs';
import { _ as __nuxt_component_2 } from './ModelForm-vVRtBGMb.mjs';
import { _ as __nuxt_component_3 } from './EmptyState-DK0sbXW-.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useCmsAdmin, f as formatDateTime } from './useCmsAdmin-JU0iaKpB.mjs';
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
    const { adminRepository, modelStatusOptions } = useCmsAdmin();
    const { t } = useLocale();
    const { data, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`models:${route.params.id}`, async () => {
      const [model, models, entries] = await Promise.all([
        adminRepository.getModel(String(route.params.id)),
        adminRepository.listModels(),
        adminRepository.listEntries(String(route.params.id))
      ]);
      return {
        model: model.item,
        models: models.items,
        entries: entries.items
      };
    })), __temp = await __temp, __restore(), __temp);
    if (!data.value?.model) {
      throw createError({ statusCode: 404, statusMessage: t("error.modelNotFound") });
    }
    async function submit(payload) {
      await adminRepository.updateModel(String(route.params.id), payload);
      await refresh();
    }
    async function removeModel() {
      await adminRepository.deleteModel(String(route.params.id));
      await navigateTo("/models");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeading = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1$1;
      const _component_ModelForm = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_EmptyState = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeading, {
        eyebrow: unref(t)("models.detail.eyebrow"),
        title: unref(data).model.name,
        description: unref(data).model.description || unref(t)("models.detail.descriptionFallback")
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="action-button text-red-700" type="button"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:trash-2",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(t)("models.detail.delete"))}</button>`);
          } else {
            return [
              createVNode("button", {
                class: "action-button text-red-700",
                type: "button",
                onClick: removeModel
              }, [
                createVNode(_component_Icon, {
                  name: "lucide:trash-2",
                  size: "16"
                }),
                createTextVNode(" " + toDisplayString(unref(t)("models.detail.delete")), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px]"><div class="space-y-6">`);
      _push(ssrRenderComponent(_component_ModelForm, {
        model: unref(data).model,
        models: unref(data).models,
        "status-options": unref(modelStatusOptions),
        "submit-label": unref(t)("modelForm.save"),
        onSubmit: submit
      }, null, _parent));
      _push(`</div><aside class="space-y-6"><article class="hard-panel space-y-4 px-5 py-5"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">${ssrInterpolate(unref(t)("models.detail.snapshot"))}</p><div class="space-y-3 text-sm leading-6 text-black/62"><p><span class="font-medium text-black">${ssrInterpolate(unref(t)("common.updated"))}</span><br>${ssrInterpolate(unref(formatDateTime)(unref(data).model.updatedAt))}</p><p><span class="font-medium text-black">${ssrInterpolate(unref(t)("models.detail.apiPath"))}</span><br><code>${ssrInterpolate(`/api/v1/content/${unref(data).model.apiId}`)}</code></p><p><span class="font-medium text-black">${ssrInterpolate(unref(t)("models.detail.entriesUsing"))}</span><br>${ssrInterpolate(unref(data).entries.length)}</p></div></article><article class="hard-panel px-5 py-5"><div class="flex items-center justify-between border-b border-black/10 pb-4"><div><p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">${ssrInterpolate(unref(t)("models.detail.relatedEntriesEyebrow"))}</p><h2 class="mt-2 text-lg font-semibold tracking-[-0.04em]">${ssrInterpolate(unref(t)("models.detail.relatedEntriesTitle"))}</h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "action-button px-3 py-2 text-sm",
        to: `/entries/new?modelId=${unref(data).model.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("models.detail.newEntry"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("models.detail.newEntry")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(data).entries.length) {
        _push(`<div class="data-grid mt-4"><!--[-->`);
        ssrRenderList(unref(data).entries.slice(0, 6), (entry) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: entry.id,
            to: `/entries/${entry.id}`,
            class: "block px-1 py-4"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<p class="font-medium"${_scopeId}>${ssrInterpolate(entry.title)}</p><p class="mt-1 text-sm text-black/55"${_scopeId}>${ssrInterpolate(entry.slug)}</p>`);
              } else {
                return [
                  createVNode("p", { class: "font-medium" }, toDisplayString(entry.title), 1),
                  createVNode("p", { class: "mt-1 text-sm text-black/55" }, toDisplayString(entry.slug), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(ssrRenderComponent(_component_EmptyState, {
          title: unref(t)("models.detail.noEntriesTitle"),
          message: unref(t)("models.detail.noEntriesMessage")
        }, null, _parent));
      }
      _push(`</article></aside></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/models/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-B5D9o_vy.mjs.map
