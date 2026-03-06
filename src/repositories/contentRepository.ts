import type { ApiItemResponse, ApiListResponse, ContentModel, DeliveryContentItem, MediaItem } from '~/types'

export const contentRepository = {
  listContent(modelApiId: string, query?: { q?: string; projectId?: string }) {
    return $fetch<ApiListResponse<DeliveryContentItem>>(`/api/v1/content/${modelApiId}`, {
      query,
    })
  },

  getContent(modelApiId: string, entryId: string, query?: { projectId?: string }) {
    return $fetch<ApiItemResponse<DeliveryContentItem>>(`/api/v1/content/${modelApiId}/${entryId}`, {
      query,
    })
  },

  listMedia() {
    return $fetch<ApiListResponse<MediaItem>>('/api/v1/media')
  },

  getMedia(id: string) {
    return $fetch<ApiItemResponse<MediaItem>>(`/api/v1/media/${id}`)
  },

  listModels() {
    return $fetch<ApiListResponse<ContentModel>>('/api/v1/admin/models')
  },
}
