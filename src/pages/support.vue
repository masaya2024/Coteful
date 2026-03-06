<script setup lang="ts">
const { t } = useLocale()
const { session, activeProject } = useWorkspaceSession()
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('contact.memberEyebrow')"
      :title="t('contact.memberTitle')"
      :description="t('contact.memberDescription')"
    />

    <InquiryComposer
      mode="member"
      :user-name="session?.user.name"
      :user-email="session?.user.email"
      :project-name="activeProject?.name"
    />
  </div>
</template>
