import { g as useRoute, u as useLocale, a as useWorkspaceSession, e as __nuxt_component_0$1, _ as __nuxt_component_1$1, j as __nuxt_component_1 } from './server.mjs';
import { useSSRContext, defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { t } = useLocale();
    const { session, activeProject, availableProjects, pendingInvites } = useWorkspaceSession();
    const switchingProject = ref(false);
    const items = computed(() => [
      { label: t("nav.dashboard"), to: "/", icon: "lucide:layout-dashboard" },
      { label: t("nav.projects"), to: "/projects", icon: "lucide:folder-kanban" },
      { label: t("nav.models"), to: "/models", icon: "lucide:blocks" },
      { label: t("nav.entries"), to: "/entries", icon: "lucide:file-pen-line" },
      { label: t("nav.media"), to: "/media", icon: "lucide:image" },
      { label: t("nav.api"), to: "/api-settings", icon: "lucide:webhook" }
    ]);
    function isActive(path) {
      if (path === "/") {
        return route.path === path;
      }
      return route.path.startsWith(path);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "hard-panel sidebar-scroll flex flex-col border-b border-black/10 bg-white/90 lg:fixed lg:inset-y-0 lg:left-0 lg:w-[320px] lg:border-r lg:border-b-0 lg:shadow-none" }, _attrs))}><div class="border-b border-black/15 px-5 py-5 md:px-6 md:py-6"><div class="flex items-center justify-between gap-4"><p class="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-black/45"> Conteful </p>`);
      if (unref(pendingInvites).length) {
        _push(`<span class="pill" data-tone="warning">${ssrInterpolate(unref(pendingInvites).length)} ${ssrInterpolate(unref(t)("sidebar.pendingInvites"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-4 space-y-2"><p class="text-xs uppercase tracking-[0.22em] text-black/38">${ssrInterpolate(unref(t)("sidebar.currentProject"))}</p><h1 class="text-2xl font-semibold tracking-[-0.04em]">${ssrInterpolate(unref(activeProject)?.name || unref(t)("sidebar.noProject"))}</h1><p class="max-w-xs text-sm leading-6 text-black/55">${ssrInterpolate(unref(activeProject)?.description || unref(t)("sidebar.projectDescriptionFallback"))}</p></div><label class="mt-5 block space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("sidebar.switchProject"))}</span><select class="form-select"${ssrRenderAttr("value", unref(activeProject)?.id)}${ssrIncludeBooleanAttr(unref(switchingProject) || unref(availableProjects).length <= 1) ? " disabled" : ""}><!--[-->`);
      ssrRenderList(unref(availableProjects), (project) => {
        _push(`<option${ssrRenderAttr("value", project.id)}>${ssrInterpolate(project.name)}</option>`);
      });
      _push(`<!--]--></select></label></div><nav class="sidebar-scroll flex-1 min-h-0 overflow-y-auto px-3 py-4"><!--[-->`);
      ssrRenderList(unref(items), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: ["grid-stagger mb-2 flex items-center justify-between border px-4 py-3 transition", isActive(item.to) ? "border-black bg-black text-white" : "border-black/10 bg-white text-black hover:border-black/35"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="flex items-center gap-3 font-medium"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: item.icon,
                size: "18"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.label)}</span>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:chevron-right",
                size: "16",
                class: isActive(item.to) ? "opacity-70" : "opacity-35"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", { class: "flex items-center gap-3 font-medium" }, [
                  createVNode(_component_Icon, {
                    name: item.icon,
                    size: "18"
                  }, null, 8, ["name"]),
                  createTextVNode(" " + toDisplayString(item.label), 1)
                ]),
                createVNode(_component_Icon, {
                  name: "lucide:chevron-right",
                  size: "16",
                  class: isActive(item.to) ? "opacity-70" : "opacity-35"
                }, null, 8, ["class"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="border-t border-black/10 px-5 py-5 md:px-6"><div class="rounded-2xl border border-black/10 bg-black/[0.025] px-4 py-4"><p class="text-xs uppercase tracking-[0.2em] text-black/40">${ssrInterpolate(unref(t)("sidebar.signedInAs"))}</p><p class="mt-2 font-medium">${ssrInterpolate(unref(session)?.user.name || unref(t)("sidebar.guestName"))}</p><p class="mt-1 text-sm text-black/58">${ssrInterpolate(unref(session)?.user.email || unref(t)("sidebar.guestEmail"))}</p></div><div class="mt-5 flex flex-wrap gap-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "action-button px-3 py-2 text-sm",
        to: "/projects"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:users",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(t)("sidebar.manageProjects"))}`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:users",
                size: "16"
              }),
              createTextVNode(" " + toDisplayString(unref(t)("sidebar.manageProjects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "action-button px-3 py-2 text-sm",
        to: "/support",
        "data-variant": unref(route).path === "/support" ? "solid" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:life-buoy",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(t)("sidebar.contactSupport"))}`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:life-buoy",
                size: "16"
              }),
              createTextVNode(" " + toDisplayString(unref(t)("sidebar.contactSupport")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="action-button px-3 py-2 text-sm" type="button">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:log-out",
        size: "16"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(t)("auth.logout"))}</button></div><p class="mt-5 text-xs uppercase tracking-[0.2em] text-black/40">${ssrInterpolate(unref(t)("sidebar.postureTitle"))}</p><p class="mt-2 text-sm leading-6 text-black/58">${ssrInterpolate(unref(t)("sidebar.postureBody"))}</p></div></aside>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "AppSidebar" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppSidebar = __nuxt_component_0;
  const _component_LocaleDock = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-shell text-black" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AppSidebar, null, null, _parent));
  _push(`<main class="min-w-0 lg:pl-[320px]"><div class="px-4 py-4 md:px-6 md:py-6 lg:h-screen lg:overflow-y-auto lg:px-8 lg:py-8"><div class="mb-3 flex justify-end md:mb-4">`);
  _push(ssrRenderComponent(_component_LocaleDock, { mode: "menu" }, null, _parent));
  _push(`</div><div class="soft-panel min-h-[calc(100vh-8rem)] px-5 py-5 md:px-8 md:py-8 lg:min-h-[calc(100vh-4rem)]">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div></main></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-BwEKE-rL.mjs.map
