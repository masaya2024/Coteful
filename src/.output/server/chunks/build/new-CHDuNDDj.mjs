import { _ as __nuxt_component_0 } from './PageHeading-CcJIC8pa.mjs';
import { _ as __nuxt_component_2 } from './MediaForm-BLhlDTSV.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useCmsAdmin } from './useCmsAdmin-JU0iaKpB.mjs';
import { u as useLocale, n as navigateTo } from './server.mjs';
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
  setup(__props) {
    const { adminRepository } = useCmsAdmin();
    const { t } = useLocale();
    async function submit(payload) {
      const response = await adminRepository.createMedia(payload);
      await navigateTo(`/media/${response.item.id}`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeading = __nuxt_component_0;
      const _component_MediaForm = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeading, {
        eyebrow: unref(t)("media.new.eyebrow"),
        title: unref(t)("media.new.title"),
        description: unref(t)("media.new.description")
      }, null, _parent));
      _push(ssrRenderComponent(_component_MediaForm, {
        "submit-label": unref(t)("mediaForm.create"),
        onSubmit: submit
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-CHDuNDDj.mjs.map
