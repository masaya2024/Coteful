import { _ as __nuxt_component_0 } from './PageHeading-CcJIC8pa.mjs';
import { _ as __nuxt_component_2 } from './ModelForm-vVRtBGMb.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useCmsAdmin } from './useCmsAdmin-JU0iaKpB.mjs';
import { u as useLocale, d as useAsyncData, n as navigateTo } from './server.mjs';
import './EmptyState-DK0sbXW-.mjs';
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
    const { adminRepository, modelStatusOptions } = useCmsAdmin();
    const { t } = useLocale();
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("models:new:deps", () => adminRepository.listModels())), __temp = await __temp, __restore(), __temp);
    async function submit(payload) {
      const response = await adminRepository.createModel(payload);
      await navigateTo(`/models/${response.item.id}`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeading = __nuxt_component_0;
      const _component_ModelForm = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeading, {
        eyebrow: unref(t)("models.new.eyebrow"),
        title: unref(t)("models.new.title"),
        description: unref(t)("models.new.description")
      }, null, _parent));
      _push(ssrRenderComponent(_component_ModelForm, {
        models: unref(data)?.items || [],
        "status-options": unref(modelStatusOptions),
        "submit-label": unref(t)("modelForm.create"),
        onSubmit: submit
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/models/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-C9rO3o4v.mjs.map
