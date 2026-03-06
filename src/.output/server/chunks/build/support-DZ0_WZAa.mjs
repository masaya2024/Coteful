import { _ as __nuxt_component_0 } from './PageHeading-CcJIC8pa.mjs';
import { _ as __nuxt_component_1 } from './InquiryComposer-DOemh6Ob.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useLocale, a as useWorkspaceSession } from './server.mjs';
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
  __name: "support",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useLocale();
    const { session, activeProject } = useWorkspaceSession();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeading = __nuxt_component_0;
      const _component_InquiryComposer = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeading, {
        eyebrow: unref(t)("contact.memberEyebrow"),
        title: unref(t)("contact.memberTitle"),
        description: unref(t)("contact.memberDescription")
      }, null, _parent));
      _push(ssrRenderComponent(_component_InquiryComposer, {
        mode: "member",
        "user-name": unref(session)?.user.name,
        "user-email": unref(session)?.user.email,
        "project-name": unref(activeProject)?.name
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/support.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=support-DZ0_WZAa.mjs.map
