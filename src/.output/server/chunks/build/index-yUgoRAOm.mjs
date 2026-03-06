import { _ as __nuxt_component_0 } from './PageHeading-CcJIC8pa.mjs';
import { u as useLocale, a as useWorkspaceSession, b as useReloadOverlay, d as useAsyncData, _ as __nuxt_component_1$1, e as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_3 } from './EmptyState-DK0sbXW-.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MetricStrip",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "grid gap-4 md:grid-cols-3" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<article class="grid-stagger soft-panel space-y-4 px-5 py-5"><p class="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-black/42">${ssrInterpolate(item.label)}</p><p class="metric-value">${ssrInterpolate(item.value)}</p><p class="text-sm leading-6 text-black/55">${ssrInterpolate(item.caption)}</p></article>`);
      });
      _push(`<!--]--></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MetricStrip.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "MetricStrip" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { adminRepository } = useCmsAdmin();
    const { t } = useLocale();
    const { activeProject } = useWorkspaceSession();
    const { run } = useReloadOverlay();
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("dashboard", () => adminRepository.getDashboard())), __temp = await __temp, __restore(), __temp);
    const metrics = computed(() => [
      {
        label: t("dashboard.metricModels"),
        value: data.value?.counts.models ?? 0,
        caption: t("dashboard.metricModelsCaption")
      },
      {
        label: t("dashboard.metricEntries"),
        value: data.value?.counts.entries ?? 0,
        caption: t("dashboard.metricEntriesCaption")
      },
      {
        label: t("dashboard.metricMedia"),
        value: data.value?.counts.media ?? 0,
        caption: t("dashboard.metricMediaCaption")
      }
    ]);
    const quickLinks = computed(() => [
      {
        label: t("dashboard.quickActionModel"),
        to: "/models/new",
        note: t("dashboard.quickActionModelNote")
      },
      {
        label: t("dashboard.quickActionEntry"),
        to: "/entries/new",
        note: t("dashboard.quickActionEntryNote")
      },
      {
        label: t("dashboard.quickActionMedia"),
        to: "/media/new",
        note: t("dashboard.quickActionMediaNote")
      }
    ]);
    async function refreshDashboard() {
      await run(() => refresh());
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeading = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1$1;
      const _component_MetricStrip = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_EmptyState = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeading, {
        eyebrow: unref(t)("dashboard.eyebrow"),
        title: unref(t)("dashboard.title"),
        description: unref(activeProject)?.name ? `${unref(t)("dashboard.description")} (${unref(activeProject).name})` : unref(t)("dashboard.description")
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="action-button" type="button"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-up-right",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(t)("common.refreshSnapshot"))}</button>`);
          } else {
            return [
              createVNode("button", {
                class: "action-button",
                type: "button",
                onClick: ($event) => refreshDashboard()
              }, [
                createVNode(_component_Icon, {
                  name: "lucide:arrow-up-right",
                  size: "16"
                }),
                createTextVNode(" " + toDisplayString(unref(t)("common.refreshSnapshot")), 1)
              ], 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_MetricStrip, { items: unref(metrics) }, null, _parent));
      _push(`<div class="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px]"><section class="space-y-6"><article class="soft-panel px-5 py-5"><div class="flex items-center justify-between border-b border-black/10 pb-4"><div><p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">${ssrInterpolate(unref(t)("dashboard.recentModelsEyebrow"))}</p><h2 class="mt-2 text-xl font-semibold tracking-[-0.04em]">${ssrInterpolate(unref(t)("dashboard.recentModelsTitle"))}</h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "action-button px-3 py-2 text-sm",
        to: "/models"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("actions.openModels"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("actions.openModels")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(data)?.recentModels.length) {
        _push(`<div class="data-grid mt-4"><!--[-->`);
        ssrRenderList(unref(data).recentModels, (model) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: model.id,
            to: `/models/${model.id}`,
            class: "grid gap-2 px-1 py-4 md:grid-cols-[minmax(0,1fr)_160px_120px]"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div${_scopeId}><p class="font-medium"${_scopeId}>${ssrInterpolate(model.name)}</p><p class="mt-1 text-sm text-black/55"${_scopeId}>${ssrInterpolate(model.description)}</p></div><div class="text-sm text-black/55"${_scopeId}><p class="font-medium text-black"${_scopeId}>${ssrInterpolate(model.apiId)}</p><p${_scopeId}>${ssrInterpolate(model.fields.length)} ${ssrInterpolate(unref(t)("common.fields"))}</p></div><div class="text-sm text-black/55 md:text-right"${_scopeId}><span class="pill"${ssrRenderAttr("data-tone", model.status === "active" ? "success" : "warning")}${_scopeId}>${ssrInterpolate(unref(t)(`status.${model.status}`))}</span><p class="mt-2"${_scopeId}>${ssrInterpolate(unref(formatDateTime)(model.updatedAt))}</p></div>`);
              } else {
                return [
                  createVNode("div", null, [
                    createVNode("p", { class: "font-medium" }, toDisplayString(model.name), 1),
                    createVNode("p", { class: "mt-1 text-sm text-black/55" }, toDisplayString(model.description), 1)
                  ]),
                  createVNode("div", { class: "text-sm text-black/55" }, [
                    createVNode("p", { class: "font-medium text-black" }, toDisplayString(model.apiId), 1),
                    createVNode("p", null, toDisplayString(model.fields.length) + " " + toDisplayString(unref(t)("common.fields")), 1)
                  ]),
                  createVNode("div", { class: "text-sm text-black/55 md:text-right" }, [
                    createVNode("span", {
                      class: "pill",
                      "data-tone": model.status === "active" ? "success" : "warning"
                    }, toDisplayString(unref(t)(`status.${model.status}`)), 9, ["data-tone"]),
                    createVNode("p", { class: "mt-2" }, toDisplayString(unref(formatDateTime)(model.updatedAt)), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(ssrRenderComponent(_component_EmptyState, {
          title: unref(t)("dashboard.noModelsTitle"),
          message: unref(t)("dashboard.noModelsMessage")
        }, null, _parent));
      }
      _push(`</article><article class="soft-panel px-5 py-5"><div class="flex items-center justify-between border-b border-black/10 pb-4"><div><p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">${ssrInterpolate(unref(t)("dashboard.recentEntriesEyebrow"))}</p><h2 class="mt-2 text-xl font-semibold tracking-[-0.04em]">${ssrInterpolate(unref(t)("dashboard.recentEntriesTitle"))}</h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "action-button px-3 py-2 text-sm",
        to: "/entries"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("actions.openEntries"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("actions.openEntries")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(data)?.recentEntries.length) {
        _push(`<div class="data-grid mt-4"><!--[-->`);
        ssrRenderList(unref(data).recentEntries, (entry) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: entry.id,
            to: `/entries/${entry.id}`,
            class: "grid gap-2 px-1 py-4 md:grid-cols-[minmax(0,1fr)_120px_160px]"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div${_scopeId}><p class="font-medium"${_scopeId}>${ssrInterpolate(entry.title)}</p><p class="mt-1 text-sm text-black/55"${_scopeId}>${ssrInterpolate(entry.slug)}</p></div><div${_scopeId}><span class="pill"${ssrRenderAttr("data-tone", entry.status === "published" ? "success" : "warning")}${_scopeId}>${ssrInterpolate(unref(t)(`status.${entry.status}`))}</span></div><div class="text-sm text-black/55 md:text-right"${_scopeId}>${ssrInterpolate(unref(formatDateTime)(entry.updatedAt))}</div>`);
              } else {
                return [
                  createVNode("div", null, [
                    createVNode("p", { class: "font-medium" }, toDisplayString(entry.title), 1),
                    createVNode("p", { class: "mt-1 text-sm text-black/55" }, toDisplayString(entry.slug), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", {
                      class: "pill",
                      "data-tone": entry.status === "published" ? "success" : "warning"
                    }, toDisplayString(unref(t)(`status.${entry.status}`)), 9, ["data-tone"])
                  ]),
                  createVNode("div", { class: "text-sm text-black/55 md:text-right" }, toDisplayString(unref(formatDateTime)(entry.updatedAt)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(ssrRenderComponent(_component_EmptyState, {
          title: unref(t)("dashboard.noEntriesTitle"),
          message: unref(t)("dashboard.noEntriesMessage")
        }, null, _parent));
      }
      _push(`</article></section><aside class="space-y-6"><article class="hard-panel px-5 py-5"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">${ssrInterpolate(unref(t)("dashboard.quickActions"))}</p><div class="mt-4 space-y-3"><!--[-->`);
      ssrRenderList(unref(quickLinks), (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.to,
          to: link.to,
          class: "block border border-black/12 bg-white px-4 py-4 transition hover:border-black/35"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="font-medium"${_scopeId}>${ssrInterpolate(link.label)}</p><p class="mt-2 text-sm leading-6 text-black/55"${_scopeId}>${ssrInterpolate(link.note)}</p>`);
            } else {
              return [
                createVNode("p", { class: "font-medium" }, toDisplayString(link.label), 1),
                createVNode("p", { class: "mt-2 text-sm leading-6 text-black/55" }, toDisplayString(link.note), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></article><article class="hard-panel px-5 py-5"><div class="flex items-center justify-between"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">${ssrInterpolate(unref(t)("dashboard.latestMediaEyebrow"))}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/media",
        class: "text-sm font-medium underline decoration-black/20 underline-offset-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("actions.viewAll"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("actions.viewAll")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(data)?.recentMedia.length) {
        _push(`<div class="data-grid mt-4"><!--[-->`);
        ssrRenderList(unref(data).recentMedia, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.id,
            to: `/media/${item.id}`,
            class: "grid gap-2 px-1 py-4"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-start justify-between gap-4"${_scopeId}><div${_scopeId}><p class="font-medium"${_scopeId}>${ssrInterpolate(item.fileName)}</p><p class="mt-1 text-sm text-black/55"${_scopeId}>${ssrInterpolate(item.mimeType)} · ${ssrInterpolate(unref(formatBytes)(item.size))}</p></div><span class="pill"${_scopeId}>${ssrInterpolate(item.tags?.[0] || unref(t)("nav.media"))}</span></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "font-medium" }, toDisplayString(item.fileName), 1),
                      createVNode("p", { class: "mt-1 text-sm text-black/55" }, toDisplayString(item.mimeType) + " · " + toDisplayString(unref(formatBytes)(item.size)), 1)
                    ]),
                    createVNode("span", { class: "pill" }, toDisplayString(item.tags?.[0] || unref(t)("nav.media")), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(ssrRenderComponent(_component_EmptyState, {
          title: unref(t)("dashboard.noMediaTitle"),
          message: unref(t)("dashboard.noMediaMessage")
        }, null, _parent));
      }
      _push(`</article></aside></div>`);
      if (unref(pending)) {
        _push(`<div class="text-sm text-black/50">${ssrInterpolate(unref(t)("common.loadingDashboard"))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-yUgoRAOm.mjs.map
