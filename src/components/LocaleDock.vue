<script setup lang="ts">
const props = withDefaults(defineProps<{
  mode?: 'dock' | 'menu'
}>(), {
  mode: 'dock',
})

const { locale, locales, setLocale, t } = useLocale()
const menuRef = ref<HTMLElement | null>(null)
const menuOpen = ref(false)

const currentLocale = computed(() => {
  return locales.find(item => item.value === locale.value) ?? locales[0]
})

function closeMenu() {
  menuOpen.value = false
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function applyLocale(next: (typeof locales)[number]['value']) {
  setLocale(next)
  closeMenu()
}

function handlePointerDown(event: PointerEvent) {
  if (props.mode !== 'menu') {
    return
  }

  if (menuRef.value?.contains(event.target as Node)) {
    return
  }

  closeMenu()
}

onMounted(() => {
  if (props.mode !== 'menu') {
    return
  }

  document.addEventListener('pointerdown', handlePointerDown)
})

onBeforeUnmount(() => {
  if (props.mode !== 'menu') {
    return
  }

  document.removeEventListener('pointerdown', handlePointerDown)
})
</script>

<template>
  <div v-if="props.mode === 'dock'" class="locale-dock">
    <div class="hard-panel locale-dock-panel flex items-center gap-2 px-3 py-3">
      <span class="hidden text-xs font-semibold uppercase tracking-[0.2em] text-black/38 md:block">
        {{ t('public.language') }}
      </span>
      <button
        v-for="item in locales"
        :key="item.value"
        type="button"
        class="action-button px-3 py-2 text-sm"
        :data-variant="locale === item.value ? 'solid' : undefined"
        @click="setLocale(item.value)"
      >
        {{ t(item.labelKey) }}
      </button>
    </div>
  </div>

  <div v-else ref="menuRef" class="locale-menu">
    <button
      type="button"
      class="action-button locale-menu-trigger px-4 py-3 text-sm"
      aria-haspopup="menu"
      :aria-expanded="String(menuOpen)"
      :data-open="menuOpen ? 'true' : undefined"
      @click="toggleMenu"
    >
      <span class="locale-menu-meta">
        <span class="locale-menu-label">{{ t('sidebar.language') }}</span>
        <span class="locale-menu-value">{{ t(currentLocale.labelKey) }}</span>
      </span>
      <Icon name="lucide:chevrons-up-down" size="16" class="locale-menu-icon" />
    </button>

    <Transition name="fade">
      <div v-if="menuOpen" class="hard-panel locale-menu-panel" role="menu">
        <button
          v-for="item in locales"
          :key="item.value"
          type="button"
          class="locale-menu-item"
          role="menuitemradio"
          :aria-checked="locale === item.value"
          :data-active="locale === item.value ? 'true' : undefined"
          @click="applyLocale(item.value)"
        >
          <span class="font-medium">{{ t(item.labelKey) }}</span>
          <Icon v-if="locale === item.value" name="lucide:check" size="16" />
        </button>
      </div>
    </Transition>
  </div>
</template>
