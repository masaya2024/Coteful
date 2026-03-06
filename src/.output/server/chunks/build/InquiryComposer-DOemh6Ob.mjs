import { u as useLocale, _ as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, reactive, computed, watchEffect, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InquiryComposer",
  __ssrInlineRender: true,
  props: {
    mode: {},
    userName: { default: "" },
    userEmail: { default: "" },
    projectName: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const form = reactive({
      topic: "",
      company: "",
      name: "",
      email: "",
      message: ""
    });
    const topicOptions = computed(() => props.mode === "member" ? [
      { value: "bug", label: t("contact.topic.bug") },
      { value: "feature", label: t("contact.topic.feature") },
      { value: "account", label: t("contact.topic.account") },
      { value: "operations", label: t("contact.topic.operations") }
    ] : [
      { value: "sales", label: t("contact.topic.sales") },
      { value: "demo", label: t("contact.topic.demo") },
      { value: "pricing", label: t("contact.topic.pricing") },
      { value: "general", label: t("contact.topic.general") }
    ]);
    watchEffect(() => {
      if (!form.topic && topicOptions.value[0]) {
        form.topic = topicOptions.value[0].value;
      }
    });
    const selectedTopicLabel = computed(() => {
      return topicOptions.value.find((option) => option.value === form.topic)?.label || "";
    });
    const effectiveName = computed(() => {
      return props.mode === "member" ? props.userName?.trim() || "" : form.name.trim();
    });
    const effectiveEmail = computed(() => {
      return props.mode === "member" ? props.userEmail?.trim() || "" : form.email.trim();
    });
    const effectiveProject = computed(() => {
      return props.projectName?.trim() || t("contact.projectFallback");
    });
    const canSubmit = computed(() => {
      return Boolean(
        selectedTopicLabel.value && effectiveName.value && effectiveEmail.value && form.message.trim()
      );
    });
    const subject = computed(() => {
      if (props.mode === "member") {
        return `[Conteful Support] ${selectedTopicLabel.value} / ${effectiveProject.value}`;
      }
      return `[Conteful Inquiry] ${selectedTopicLabel.value} / ${form.company.trim() || effectiveName.value}`;
    });
    const body = computed(() => {
      const lines = props.mode === "member" ? [
        "Inquiry Type: Logged-in Support",
        `User: ${effectiveName.value || "-"}`,
        `Email: ${effectiveEmail.value || "-"}`,
        `Project: ${effectiveProject.value}`,
        `Topic: ${selectedTopicLabel.value || "-"}`,
        "",
        "Message:",
        form.message.trim()
      ] : [
        "Inquiry Type: Public Inquiry",
        `Company: ${form.company.trim() || "-"}`,
        `Name: ${effectiveName.value || "-"}`,
        `Email: ${effectiveEmail.value || "-"}`,
        `Topic: ${selectedTopicLabel.value || "-"}`,
        "",
        "Message:",
        form.message.trim()
      ];
      return lines.join("\n");
    });
    computed(() => {
      return `mailto:hello@conteful.app?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(body.value)}`;
    });
    const contextItems = computed(() => {
      if (props.mode === "member") {
        return [
          { label: t("contact.contextUser"), value: effectiveName.value || "-" },
          { label: t("contact.contextEmail"), value: effectiveEmail.value || "-" },
          { label: t("contact.contextProject"), value: effectiveProject.value }
        ];
      }
      return [
        { label: t("contact.contextFlow"), value: t("contact.contextFlowPublic") },
        { label: t("contact.contextReply"), value: effectiveEmail.value || t("contact.contextReplyPending") }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "soft-panel px-5 py-5 md:px-6 md:py-6" }, _attrs))}><div class="grid gap-5 border-b border-black/10 pb-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start"><div><p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">${ssrInterpolate(unref(t)("public.contact"))}</p><h2 class="mt-2 text-2xl font-semibold tracking-[-0.04em] text-black">${ssrInterpolate(unref(t)("contact.formTitle"))}</h2><p class="mt-3 max-w-2xl text-sm leading-6 text-black/58">${ssrInterpolate(__props.mode === "member" ? unref(t)("contact.formDescriptionMember") : unref(t)("contact.formDescriptionPublic"))}</p></div><div class="rounded-3xl border border-black/10 bg-black/[0.025] px-4 py-4"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">${ssrInterpolate(unref(t)("contact.targetLabel"))}</p><p class="mt-3 text-lg font-semibold tracking-[-0.03em] text-black"> hello@conteful.app </p><p class="mt-2 text-sm leading-6 text-black/58">${ssrInterpolate(unref(t)("contact.targetHint"))}</p></div></div><div class="${ssrRenderClass([__props.mode === "member" ? "md:grid-cols-3" : "md:grid-cols-2", "mt-6 grid gap-4"])}"><!--[-->`);
      ssrRenderList(unref(contextItems), (item) => {
        _push(`<div class="rounded-3xl border border-black/10 bg-white px-4 py-4"><p class="text-xs uppercase tracking-[0.2em] text-black/38">${ssrInterpolate(item.label)}</p><p class="mt-3 text-sm font-medium leading-6 text-black">${ssrInterpolate(item.value)}</p></div>`);
      });
      _push(`<!--]--></div>`);
      if (__props.mode === "public") {
        _push(`<div class="mt-6 grid gap-4 md:grid-cols-3"><label class="space-y-2 text-sm md:col-span-1"><span class="font-medium">${ssrInterpolate(unref(t)("contact.company"))}</span><input${ssrRenderAttr("value", unref(form).company)} class="form-input" type="text" autocomplete="organization"></label><label class="space-y-2 text-sm md:col-span-1"><span class="font-medium">${ssrInterpolate(unref(t)("contact.name"))}</span><input${ssrRenderAttr("value", unref(form).name)} class="form-input" type="text" autocomplete="name"></label><label class="space-y-2 text-sm md:col-span-1"><span class="font-medium">${ssrInterpolate(unref(t)("contact.email"))}</span><input${ssrRenderAttr("value", unref(form).email)} class="form-input" type="email" autocomplete="email"></label></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-6 grid gap-4"><label class="space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("contact.topic"))}</span><select class="form-select"><!--[-->`);
      ssrRenderList(unref(topicOptions), (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).topic) ? ssrLooseContain(unref(form).topic, option.value) : ssrLooseEqual(unref(form).topic, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select></label><label class="space-y-2 text-sm"><span class="font-medium">${ssrInterpolate(unref(t)("contact.message"))}</span><textarea class="form-textarea"${ssrRenderAttr("placeholder", __props.mode === "member" ? unref(t)("contact.messagePlaceholderMember") : unref(t)("contact.messagePlaceholderPublic"))}>${ssrInterpolate(unref(form).message)}</textarea></label></div><div class="mt-6 flex flex-col gap-4 border-t border-black/10 pt-5 md:flex-row md:items-center md:justify-between"><p class="max-w-2xl text-sm leading-6 text-black/58">${ssrInterpolate(__props.mode === "member" ? unref(t)("contact.responseBodyMember") : unref(t)("contact.responseBodyPublic"))}</p><button data-variant="solid" type="button"${ssrIncludeBooleanAttr(!unref(canSubmit)) ? " disabled" : ""} class="${ssrRenderClass([!unref(canSubmit) ? "cursor-not-allowed opacity-45" : "", "action-button shrink-0"])}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:mail",
        size: "16"
      }, null, _parent));
      _push(` ${ssrInterpolate(__props.mode === "member" ? unref(t)("contact.openMemberMail") : unref(t)("contact.openPublicMail"))}</button></div>`);
      if (!unref(canSubmit)) {
        _push(`<p class="mt-4 text-sm text-black/48">${ssrInterpolate(__props.mode === "member" ? unref(t)("contact.missingMember") : unref(t)("contact.missingPublic"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/InquiryComposer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "InquiryComposer" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=InquiryComposer-DOemh6Ob.mjs.map
