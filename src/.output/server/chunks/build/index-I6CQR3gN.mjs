import { _ as __nuxt_component_0 } from './PageHeading-CcJIC8pa.mjs';
import { u as useLocale, d as useAsyncData, e as __nuxt_component_0$1, _ as __nuxt_component_1$1 } from './server.mjs';
import { _ as __nuxt_component_3 } from './EmptyState-DK0sbXW-.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { u as useCmsAdmin, a as formatBytes, f as formatDateTime } from './useCmsAdmin-JU0iaKpB.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { adminRepository } = useCmsAdmin();
    const { t } = useLocale();
    const search = ref("");
    const selectedTag = ref("");
    const { data, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("media:list", () => adminRepository.listMedia())), __temp = await __temp, __restore(), __temp);
    const availableTags = computed(() => {
      return Array.from(new Set((data.value?.items || []).flatMap((item) => item.tags || []))).sort(
        (left, right) => left.localeCompare(right)
      );
    });
    const filteredItems = computed(() => {
      const items = data.value?.items || [];
      const query = search.value.trim().toLowerCase();
      return items.filter((item) => {
        const matchesQuery = !query || [item.fileName, item.mimeType, item.alt, item.tags?.join(" ")].join(" ").toLowerCase().includes(query);
        const matchesTag = !selectedTag.value || item.tags?.includes(selectedTag.value);
        return matchesQuery && matchesTag;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeading = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      const _component_EmptyState = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeading, {
        eyebrow: unref(t)("media.index.eyebrow"),
        title: unref(t)("media.index.title"),
        description: unref(t)("media.index.description")
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              class: "action-button",
              "data-variant": "solid",
              to: "/media/new"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:plus",
                    size: "16"
                  }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(unref(t)("media.index.new"))}`);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "lucide:plus",
                      size: "16"
                    }),
                    createTextVNode(" " + toDisplayString(unref(t)("media.index.new")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                class: "action-button",
                "data-variant": "solid",
                to: "/media/new"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "lucide:plus",
                    size: "16"
                  }),
                  createTextVNode(" " + toDisplayString(unref(t)("media.index.new")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px_220px]"><label class="space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("media.index.searchLabel"))}</span><div class="relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        class: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/36",
        name: "lucide:search",
        size: "16"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(search))} class="form-input pl-10"${ssrRenderAttr("placeholder", unref(t)("media.index.searchPlaceholder"))}></div></label><label class="space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("media.index.tagFilterLabel"))}</span><select class="form-select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedTag)) ? ssrLooseContain(unref(selectedTag), "") : ssrLooseEqual(unref(selectedTag), "")) ? " selected" : ""}>${ssrInterpolate(unref(t)("media.index.allTags"))}</option><!--[-->`);
      ssrRenderList(unref(availableTags), (tag) => {
        _push(`<option${ssrRenderAttr("value", tag)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedTag)) ? ssrLooseContain(unref(selectedTag), tag) : ssrLooseEqual(unref(selectedTag), tag)) ? " selected" : ""}>${ssrInterpolate(tag)}</option>`);
      });
      _push(`<!--]--></select></label><div class="soft-panel flex items-end justify-between px-4 py-4"><div><p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">${ssrInterpolate(unref(t)("common.total"))}</p><p class="mt-2 text-2xl font-semibold tracking-[-0.05em]">${ssrInterpolate(unref(filteredItems).length)}</p></div><button class="action-button px-3 py-2 text-sm" type="button">${ssrInterpolate(unref(t)("common.refresh"))}</button></div></section><section class="soft-panel overflow-hidden"><div class="grid border-b border-black/12 bg-black/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/48 md:grid-cols-[72px_minmax(0,1.2fr)_180px_120px_170px_120px]"><span>${ssrInterpolate(unref(t)("media.index.thumb"))}</span><span>${ssrInterpolate(unref(t)("media.index.columnMedia"))}</span><span>${ssrInterpolate(unref(t)("media.detail.mime"))}</span><span>${ssrInterpolate(unref(t)("media.detail.size"))}</span><span>${ssrInterpolate(unref(t)("common.updated"))}</span><span class="md:text-right">${ssrInterpolate(unref(t)("common.edit"))}</span></div>`);
      if (unref(filteredItems).length) {
        _push(`<div class="data-grid"><!--[-->`);
        ssrRenderList(unref(filteredItems), (item) => {
          _push(`<div class="grid gap-3 px-5 py-4 md:grid-cols-[72px_minmax(0,1.2fr)_180px_120px_170px_120px]"><div class="flex h-12 w-12 items-center justify-center border border-black/10 bg-black/[0.03] text-xs uppercase tracking-[0.16em] text-black/40"> IMG </div><div class="min-w-0">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/media/${item.id}`,
            class: "font-medium hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.fileName)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.fileName), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<p class="mt-1 truncate text-sm text-black/55">${ssrInterpolate(item.alt || item.description)}</p></div><div class="text-sm text-black/58">${ssrInterpolate(item.mimeType)}</div><div class="text-sm text-black/58">${ssrInterpolate(unref(formatBytes)(item.size))}</div><div class="text-sm text-black/58">${ssrInterpolate(unref(formatDateTime)(item.updatedAt))}</div><div class="flex items-center justify-between gap-3 md:justify-end">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/media/${item.id}`,
            class: "text-sm font-medium"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)("common.edit"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)("common.edit")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button class="text-sm font-medium text-red-700" type="button">${ssrInterpolate(unref(t)("common.delete"))}</button></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(ssrRenderComponent(_component_EmptyState, {
          title: unref(t)("media.index.noResultsTitle"),
          message: unref(t)("media.index.noResultsMessage")
        }, null, _parent));
      }
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-I6CQR3gN.mjs.map
