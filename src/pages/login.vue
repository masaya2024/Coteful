<script setup lang="ts">
definePageMeta({
  layout: 'public',
})

const { t } = useLocale()
const { login } = useWorkspaceSession()
const { data: loginOptions } = await useAsyncData('login-options', () => {
  return $fetch('/api/v1/auth/options')
})

const form = reactive({
  email: '',
  password: '',
})

const submitError = ref('')
const submitting = ref(false)
const demoAccounts = computed(() => loginOptions.value?.item.accounts || [])
const passwordHint = computed(() => loginOptions.value?.item.passwordHint || 'demo-pass')

watchEffect(() => {
  if (!form.email && demoAccounts.value[0]?.email) {
    form.email = demoAccounts.value[0].email
    form.password = passwordHint.value
  }
})

async function submit() {
  if (!form.email.trim() || !form.password.trim() || submitting.value) {
    return
  }

  submitting.value = true
  submitError.value = ''

  try {
    await login(form.email, form.password)
    await navigateTo('/')
  } catch (error) {
    const statusMessage = typeof error === 'object' && error && 'data' in error
      ? String((error as { data?: { statusMessage?: string } }).data?.statusMessage || '')
      : error instanceof Error
        ? error.message
        : ''
    submitError.value = statusMessage || t('auth.loginFailed')
  } finally {
    submitting.value = false
  }
}

function applyPreset(email: string) {
  form.email = email
  form.password = passwordHint.value
}
</script>

<template>
  <div class="auth-grid lg:grid-cols-[minmax(0,1.05fr)_420px] lg:p-6">
    <section class="auth-surface hard-panel px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
      <p class="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-black/45">
        Conteful
      </p>
      <h1 class="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-black md:text-5xl">
        {{ t('auth.title') }}
      </h1>
      <p class="mt-4 max-w-2xl text-sm leading-7 text-black/58">
        {{ t('auth.description') }}
      </p>

      <div class="mt-10 grid gap-4 md:grid-cols-3">
        <button
          v-for="account in demoAccounts"
          :key="account.email"
          class="text-left border border-black/10 bg-white px-4 py-4 transition hover:border-black/35"
          type="button"
          @click="applyPreset(account.email)"
        >
          <p class="text-xs uppercase tracking-[0.2em] text-black/35">
            {{ account.title }}
          </p>
          <p class="mt-3 font-medium text-black">
            {{ account.name }}
          </p>
          <p class="mt-2 text-sm text-black/58">
            {{ account.email }}
          </p>
        </button>
      </div>

      <div class="mt-8 rounded-3xl border border-black/10 bg-white/75 px-5 py-5">
        <p class="text-xs uppercase tracking-[0.2em] text-black/38">
          {{ t('auth.demoTitle') }}
        </p>
        <p class="mt-3 text-sm leading-7 text-black/58">
          {{ t('auth.demoMessage') }}
        </p>
        <p class="mt-3 font-mono text-sm text-black/72">
          {{ passwordHint }}
        </p>
      </div>
    </section>

    <section class="hard-panel px-6 py-8 md:px-8 md:py-10">
      <p class="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-black/42">
        {{ t('auth.signInEyebrow') }}
      </p>
      <h2 class="mt-4 text-3xl font-semibold tracking-[-0.05em] text-black">
        {{ t('auth.signInTitle') }}
      </h2>
      <p class="mt-3 text-sm leading-7 text-black/58">
        {{ t('auth.signInDescription') }}
      </p>

      <form class="mt-8 space-y-4" @submit.prevent="submit">
        <label class="block space-y-2 text-sm">
          <span class="font-medium">{{ t('auth.email') }}</span>
          <input v-model="form.email" class="form-input" type="email" autocomplete="email" />
        </label>
        <label class="block space-y-2 text-sm">
          <span class="font-medium">{{ t('auth.password') }}</span>
          <input v-model="form.password" class="form-input" type="password" autocomplete="current-password" />
        </label>

        <div v-if="submitError" class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ submitError }}
        </div>

        <button class="action-button w-full" data-variant="solid" type="submit" :disabled="submitting">
          <Icon name="lucide:log-in" size="16" />
          {{ t('auth.submit') }}
        </button>
      </form>
    </section>
  </div>
</template>
