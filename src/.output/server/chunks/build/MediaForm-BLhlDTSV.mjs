import { u as useLocale, _ as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, reactive, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { b as tagsToString } from './useCmsAdmin-JU0iaKpB.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MediaForm",
  __ssrInlineRender: true,
  props: {
    media: {},
    submitLabel: {}
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    const { t } = useLocale();
    const props = __props;
    const form = reactive({
      fileName: props.media?.fileName || "",
      url: props.media?.url || "",
      mimeType: props.media?.mimeType || "image/jpeg",
      size: props.media?.size || 24e4,
      alt: props.media?.alt || "",
      description: props.media?.description || "",
      tags: tagsToString(props.media?.tags)
    });
    watch(
      () => props.media,
      (media) => {
        if (!media) {
          return;
        }
        form.fileName = media.fileName;
        form.url = media.url;
        form.mimeType = media.mimeType;
        form.size = media.size;
        form.alt = media.alt;
        form.description = media.description;
        form.tags = tagsToString(media.tags);
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_360px]" }, _attrs))}><div class="space-y-6"><section class="grid gap-4 md:grid-cols-2"><label class="space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("mediaForm.fileName"))}</span><input${ssrRenderAttr("value", unref(form).fileName)} class="form-input" placeholder="hero-banner.jpg"></label><label class="space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("mediaForm.url"))}</span><input${ssrRenderAttr("value", unref(form).url)} class="form-input" placeholder="https://images.example.com/hero-banner.jpg"></label></section><section class="grid gap-4 md:grid-cols-2"><label class="space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("mediaForm.mime"))}</span><input${ssrRenderAttr("value", unref(form).mimeType)} class="form-input" placeholder="image/jpeg"></label><label class="space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("mediaForm.size"))}</span><input${ssrRenderAttr("value", unref(form).size)} class="form-input" type="number" min="0"></label></section><label class="space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("mediaForm.alt"))}</span><input${ssrRenderAttr("value", unref(form).alt)} class="form-input" placeholder="Editorial hero image"></label><label class="space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("mediaForm.description"))}</span><textarea class="form-textarea"${ssrRenderAttr("placeholder", unref(t)("mediaForm.description"))}>${ssrInterpolate(unref(form).description)}</textarea></label><label class="space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("mediaForm.tags"))}</span><input${ssrRenderAttr("value", unref(form).tags)} class="form-input" placeholder="campaign, homepage, spring"></label></div><aside class="space-y-5"><div class="hard-panel space-y-4 px-5 py-5"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">${ssrInterpolate(unref(t)("mediaForm.uploadMode"))}</p><p class="text-sm leading-6 text-black/64">${ssrInterpolate(unref(t)("mediaForm.uploadModeBody"))}</p><div class="space-y-2 text-sm leading-6 text-black/64"><p><span class="font-medium text-black">${ssrInterpolate(unref(t)("mediaForm.resolvedUrl"))}</span><br><code>${ssrInterpolate(unref(form).url || "https://mock.cdn.local/media-item")}</code></p><p><span class="font-medium text-black">${ssrInterpolate(unref(t)("mediaForm.tags"))}</span><br>${ssrInterpolate(unref(form).tags || unref(t)("mediaForm.noTags"))}</p></div></div><div class="flex flex-wrap gap-3"><button class="action-button" type="button">${ssrInterpolate(unref(t)("mediaForm.cancel"))}</button><button class="action-button" data-variant="solid" type="submit">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:save",
        size: "16"
      }, null, _parent));
      _push(` ${ssrInterpolate(__props.submitLabel)}</button></div></aside></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MediaForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "MediaForm" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=MediaForm-BLhlDTSV.mjs.map
