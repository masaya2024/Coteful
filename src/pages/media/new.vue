<script setup lang="ts">
const { adminRepository } = useCmsAdmin()
const { t } = useLocale()

async function submit(payload: {
  fileName: string
  url: string
  mimeType: string
  size: number
  alt: string
  description: string
  tags: string[]
}) {
  const response = await adminRepository.createMedia(payload)
  await navigateTo(`/media/${response.item.id}`)
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('media.new.eyebrow')"
      :title="t('media.new.title')"
      :description="t('media.new.description')"
    />

    <MediaForm :submit-label="t('mediaForm.create')" @submit="submit" />
  </div>
</template>
