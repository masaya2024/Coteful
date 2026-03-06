import { _ as __nuxt_component_0 } from './PageHeading-CcJIC8pa.mjs';
import { _ as __nuxt_component_2 } from './EntryForm-8TKzcy5E.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { g as useRoute, u as useLocale, d as useAsyncData, n as navigateTo } from './server.mjs';
import { u as useCmsAdmin } from './useCmsAdmin-JU0iaKpB.mjs';
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
  __name: "new",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { adminRepository, entryStatusOptions } = useCmsAdmin();
    const { t } = useLocale();
    const initialModelId = computed(() => {
      const target = route.query.modelId;
      return typeof target === "string" ? target : "";
    });
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("entries:new:deps", async () => {
      const [models, entries, media] = await Promise.all([
        adminRepository.listModels(),
        adminRepository.listEntries(),
        adminRepository.listMedia()
      ]);
      return {
        models: models.items,
        entries: entries.items,
        media: media.items
      };
    })), __temp = await __temp, __restore(), __temp);
    async function submit(payload) {
      const response = await adminRepository.createEntry(payload);
      await navigateTo(`/entries/${response.item.id}`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeading = __nuxt_component_0;
      const _component_EntryForm = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeading, {
        eyebrow: unref(t)("entries.new.eyebrow"),
        title: unref(t)("entries.new.title"),
        description: unref(t)("entries.new.description")
      }, null, _parent));
      _push(ssrRenderComponent(_component_EntryForm, {
        models: unref(data)?.models || [],
        entries: unref(data)?.entries || [],
        "media-items": unref(data)?.media || [],
        "status-options": unref(entryStatusOptions),
        "initial-model-id": unref(initialModelId),
        "submit-label": unref(t)("entryForm.create"),
        onSubmit: submit
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/entries/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-DzS47cVv.mjs.map
