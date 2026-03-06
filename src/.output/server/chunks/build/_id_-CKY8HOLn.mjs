import { _ as __nuxt_component_0 } from './PageHeading-CcJIC8pa.mjs';
import { g as useRoute, u as useLocale, d as useAsyncData, c as createError, _ as __nuxt_component_1$1, n as navigateTo } from './server.mjs';
import { _ as __nuxt_component_2 } from './EntryForm-8TKzcy5E.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
    const { adminRepository, entryStatusOptions } = useCmsAdmin();
    const { t } = useLocale();
    const { data, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`entries:${route.params.id}`, async () => {
      const [entry, models, entries, media] = await Promise.all([
        adminRepository.getEntry(String(route.params.id)),
        adminRepository.listModels(),
        adminRepository.listEntries(),
        adminRepository.listMedia()
      ]);
      return {
        entry: entry.item,
        models: models.items,
        entries: entries.items,
        media: media.items
      };
    })), __temp = await __temp, __restore(), __temp);
    if (!data.value?.entry) {
      throw createError({ statusCode: 404, statusMessage: t("error.entryNotFound") });
    }
    async function submit(payload) {
      await adminRepository.updateEntry(String(route.params.id), payload);
      await refresh();
    }
    async function removeEntry() {
      await adminRepository.deleteEntry(String(route.params.id));
      await navigateTo("/entries");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeading = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1$1;
      const _component_EntryForm = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeading, {
        eyebrow: unref(t)("entries.detail.eyebrow"),
        title: unref(data).entry.title,
        description: `${unref(t)("entries.detail.updatedPrefix")} ${unref(formatDateTime)(unref(data).entry.updatedAt)}`
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="action-button text-red-700" type="button"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:trash-2",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(t)("entries.detail.delete"))}</button>`);
          } else {
            return [
              createVNode("button", {
                class: "action-button text-red-700",
                type: "button",
                onClick: removeEntry
              }, [
                createVNode(_component_Icon, {
                  name: "lucide:trash-2",
                  size: "16"
                }),
                createTextVNode(" " + toDisplayString(unref(t)("entries.detail.delete")), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EntryForm, {
        entry: unref(data).entry,
        models: unref(data).models || [],
        entries: (unref(data).entries || []).filter((entry) => entry.id !== unref(data).entry.id),
        "media-items": unref(data).media || [],
        "status-options": unref(entryStatusOptions),
        "submit-label": unref(t)("entryForm.save"),
        onSubmit: submit
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/entries/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CKY8HOLn.mjs.map
