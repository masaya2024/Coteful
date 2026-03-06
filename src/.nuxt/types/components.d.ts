
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  AppSidebar: typeof import("../../components/AppSidebar.vue")['default']
  EmptyState: typeof import("../../components/EmptyState.vue")['default']
  EntryFieldRenderer: typeof import("../../components/EntryFieldRenderer.vue")['default']
  EntryForm: typeof import("../../components/EntryForm.vue")['default']
  InquiryComposer: typeof import("../../components/InquiryComposer.vue")['default']
  LocaleDock: typeof import("../../components/LocaleDock.vue")['default']
  MediaForm: typeof import("../../components/MediaForm.vue")['default']
  MetricStrip: typeof import("../../components/MetricStrip.vue")['default']
  ModelFieldEditor: typeof import("../../components/ModelFieldEditor.vue")['default']
  ModelForm: typeof import("../../components/ModelForm.vue")['default']
  PageHeading: typeof import("../../components/PageHeading.vue")['default']
  PublicHeader: typeof import("../../components/PublicHeader.vue")['default']
  ReloadScreen: typeof import("../../components/ReloadScreen.vue")['default']
  NuxtWelcome: typeof import("../../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtImg: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  Icon: typeof import("../../../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
  NuxtPage: typeof import("../../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAppSidebar: LazyComponent<typeof import("../../components/AppSidebar.vue")['default']>
  LazyEmptyState: LazyComponent<typeof import("../../components/EmptyState.vue")['default']>
  LazyEntryFieldRenderer: LazyComponent<typeof import("../../components/EntryFieldRenderer.vue")['default']>
  LazyEntryForm: LazyComponent<typeof import("../../components/EntryForm.vue")['default']>
  LazyInquiryComposer: LazyComponent<typeof import("../../components/InquiryComposer.vue")['default']>
  LazyLocaleDock: LazyComponent<typeof import("../../components/LocaleDock.vue")['default']>
  LazyMediaForm: LazyComponent<typeof import("../../components/MediaForm.vue")['default']>
  LazyMetricStrip: LazyComponent<typeof import("../../components/MetricStrip.vue")['default']>
  LazyModelFieldEditor: LazyComponent<typeof import("../../components/ModelFieldEditor.vue")['default']>
  LazyModelForm: LazyComponent<typeof import("../../components/ModelForm.vue")['default']>
  LazyPageHeading: LazyComponent<typeof import("../../components/PageHeading.vue")['default']>
  LazyPublicHeader: LazyComponent<typeof import("../../components/PublicHeader.vue")['default']>
  LazyReloadScreen: LazyComponent<typeof import("../../components/ReloadScreen.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyIcon: LazyComponent<typeof import("../../../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
  LazyNuxtPage: LazyComponent<typeof import("../../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
