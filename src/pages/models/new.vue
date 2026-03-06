<script setup lang="ts">
import type { ContentField } from '~/types'

const { adminRepository, modelStatusOptions } = useCmsAdmin()
const { t } = useLocale()

const { data } = await useAsyncData('models:new:deps', () => adminRepository.listModels())

async function submit(payload: {
  name: string
  apiId: string
  description: string
  status: string
  fields: ContentField[]
}) {
  const response = await adminRepository.createModel(payload)
  await navigateTo(`/models/${response.item.id}`)
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('models.new.eyebrow')"
      :title="t('models.new.title')"
      :description="t('models.new.description')"
    />

    <ModelForm
      :models="data?.items || []"
      :status-options="modelStatusOptions"
      :submit-label="t('modelForm.create')"
      @submit="submit"
    />
  </div>
</template>
