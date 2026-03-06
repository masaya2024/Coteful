<script setup lang="ts">
type InquiryMode = 'public' | 'member'

const props = withDefaults(defineProps<{
  mode: InquiryMode
  userName?: string | null
  userEmail?: string | null
  projectName?: string | null
}>(), {
  userName: '',
  userEmail: '',
  projectName: '',
})

const { t } = useLocale()

const form = reactive({
  topic: '',
  company: '',
  name: '',
  email: '',
  message: '',
})

const topicOptions = computed(() => (
  props.mode === 'member'
    ? [
        { value: 'bug', label: t('contact.topic.bug') },
        { value: 'feature', label: t('contact.topic.feature') },
        { value: 'account', label: t('contact.topic.account') },
        { value: 'operations', label: t('contact.topic.operations') },
      ]
    : [
        { value: 'sales', label: t('contact.topic.sales') },
        { value: 'demo', label: t('contact.topic.demo') },
        { value: 'pricing', label: t('contact.topic.pricing') },
        { value: 'general', label: t('contact.topic.general') },
      ]
))

watchEffect(() => {
  if (!form.topic && topicOptions.value[0]) {
    form.topic = topicOptions.value[0].value
  }
})

const selectedTopicLabel = computed(() => {
  return topicOptions.value.find(option => option.value === form.topic)?.label || ''
})

const effectiveName = computed(() => {
  return props.mode === 'member'
    ? props.userName?.trim() || ''
    : form.name.trim()
})

const effectiveEmail = computed(() => {
  return props.mode === 'member'
    ? props.userEmail?.trim() || ''
    : form.email.trim()
})

const effectiveProject = computed(() => {
  return props.projectName?.trim() || t('contact.projectFallback')
})

const canSubmit = computed(() => {
  return Boolean(
    selectedTopicLabel.value
    && effectiveName.value
    && effectiveEmail.value
    && form.message.trim(),
  )
})

const subject = computed(() => {
  if (props.mode === 'member') {
    return `[Conteful Support] ${selectedTopicLabel.value} / ${effectiveProject.value}`
  }

  return `[Conteful Inquiry] ${selectedTopicLabel.value} / ${form.company.trim() || effectiveName.value}`
})

const body = computed(() => {
  const lines = props.mode === 'member'
    ? [
        'Inquiry Type: Logged-in Support',
        `User: ${effectiveName.value || '-'}`,
        `Email: ${effectiveEmail.value || '-'}`,
        `Project: ${effectiveProject.value}`,
        `Topic: ${selectedTopicLabel.value || '-'}`,
        '',
        'Message:',
        form.message.trim(),
      ]
    : [
        'Inquiry Type: Public Inquiry',
        `Company: ${form.company.trim() || '-'}`,
        `Name: ${effectiveName.value || '-'}`,
        `Email: ${effectiveEmail.value || '-'}`,
        `Topic: ${selectedTopicLabel.value || '-'}`,
        '',
        'Message:',
        form.message.trim(),
      ]

  return lines.join('\n')
})

const mailtoHref = computed(() => {
  return `mailto:hello@conteful.app?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(body.value)}`
})

const contextItems = computed(() => {
  if (props.mode === 'member') {
    return [
      { label: t('contact.contextUser'), value: effectiveName.value || '-' },
      { label: t('contact.contextEmail'), value: effectiveEmail.value || '-' },
      { label: t('contact.contextProject'), value: effectiveProject.value },
    ]
  }

  return [
    { label: t('contact.contextFlow'), value: t('contact.contextFlowPublic') },
    { label: t('contact.contextReply'), value: effectiveEmail.value || t('contact.contextReplyPending') },
  ]
})

function openMailClient() {
  if (!canSubmit.value || !import.meta.client) {
    return
  }

  window.location.href = mailtoHref.value
}
</script>

<template>
  <article class="soft-panel px-5 py-5 md:px-6 md:py-6">
    <div class="grid gap-5 border-b border-black/10 pb-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
          {{ t('public.contact') }}
        </p>
        <h2 class="mt-2 text-2xl font-semibold tracking-[-0.04em] text-black">
          {{ t('contact.formTitle') }}
        </h2>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-black/58">
          {{ mode === 'member' ? t('contact.formDescriptionMember') : t('contact.formDescriptionPublic') }}
        </p>
      </div>

      <div class="rounded-3xl border border-black/10 bg-black/[0.025] px-4 py-4">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
          {{ t('contact.targetLabel') }}
        </p>
        <p class="mt-3 text-lg font-semibold tracking-[-0.03em] text-black">
          hello@conteful.app
        </p>
        <p class="mt-2 text-sm leading-6 text-black/58">
          {{ t('contact.targetHint') }}
        </p>
      </div>
    </div>

    <div class="mt-6 grid gap-4" :class="mode === 'member' ? 'md:grid-cols-3' : 'md:grid-cols-2'">
      <div
        v-for="item in contextItems"
        :key="item.label"
        class="rounded-3xl border border-black/10 bg-white px-4 py-4"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-black/38">
          {{ item.label }}
        </p>
        <p class="mt-3 text-sm font-medium leading-6 text-black">
          {{ item.value }}
        </p>
      </div>
    </div>

    <div v-if="mode === 'public'" class="mt-6 grid gap-4 md:grid-cols-3">
      <label class="space-y-2 text-sm md:col-span-1">
        <span class="font-medium">{{ t('contact.company') }}</span>
        <input v-model="form.company" class="form-input" type="text" autocomplete="organization" />
      </label>
      <label class="space-y-2 text-sm md:col-span-1">
        <span class="font-medium">{{ t('contact.name') }}</span>
        <input v-model="form.name" class="form-input" type="text" autocomplete="name" />
      </label>
      <label class="space-y-2 text-sm md:col-span-1">
        <span class="font-medium">{{ t('contact.email') }}</span>
        <input v-model="form.email" class="form-input" type="email" autocomplete="email" />
      </label>
    </div>

    <div class="mt-6 grid gap-4">
      <label class="space-y-2 text-sm">
        <span class="font-medium">{{ t('contact.topic') }}</span>
        <select v-model="form.topic" class="form-select">
          <option v-for="option in topicOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </label>

      <label class="space-y-2 text-sm">
        <span class="font-medium">{{ t('contact.message') }}</span>
        <textarea
          v-model="form.message"
          class="form-textarea"
          :placeholder="mode === 'member' ? t('contact.messagePlaceholderMember') : t('contact.messagePlaceholderPublic')"
        />
      </label>
    </div>

    <div class="mt-6 flex flex-col gap-4 border-t border-black/10 pt-5 md:flex-row md:items-center md:justify-between">
      <p class="max-w-2xl text-sm leading-6 text-black/58">
        {{ mode === 'member' ? t('contact.responseBodyMember') : t('contact.responseBodyPublic') }}
      </p>

      <button
        class="action-button shrink-0"
        data-variant="solid"
        type="button"
        :disabled="!canSubmit"
        :class="!canSubmit ? 'cursor-not-allowed opacity-45' : ''"
        @click="openMailClient"
      >
        <Icon name="lucide:mail" size="16" />
        {{ mode === 'member' ? t('contact.openMemberMail') : t('contact.openPublicMail') }}
      </button>
    </div>

    <p v-if="!canSubmit" class="mt-4 text-sm text-black/48">
      {{ mode === 'member' ? t('contact.missingMember') : t('contact.missingPublic') }}
    </p>
  </article>
</template>
