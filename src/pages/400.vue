<script setup lang="ts">
definePageMeta({
  layout: false,
})

throw createError({
  statusCode: 400,
  statusMessage: 'Bad Request',
  message: 'Previewing the 400 error page.',
})
</script>
