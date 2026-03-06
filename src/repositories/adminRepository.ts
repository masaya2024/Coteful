import type {
  ApiItemResponse,
  ApiListResponse,
  ApiMutationResponse,
  ApiToken,
  ApiTokenType,
  AuthSession,
  ContentEntry,
  ContentField,
  ContentModel,
  DashboardSnapshot,
  MediaItem,
  ProjectDetail,
  Project,
  ProjectInvite,
  ProjectRole,
  ProjectWebhook,
  ProjectWebhookEvent,
  ProjectWebhookStatus,
} from '~/types'

type ProjectIdGetter = () => string | null | undefined
type ModelPayload = Pick<ContentModel, 'name' | 'apiId' | 'description' | 'status' | 'fields'>
type EntryPayload = Pick<ContentEntry, 'modelId' | 'title' | 'slug' | 'status' | 'fields'>
type MediaPayload = Pick<MediaItem, 'fileName' | 'url' | 'mimeType' | 'size' | 'alt' | 'description' | 'tags'>
type TokenPayload = {
  name: string
  type: ApiTokenType
}
type LoginPayload = {
  email: string
  password: string
}
type ProjectPayload = Pick<Project, 'name' | 'slug' | 'description'>
type InvitePayload = {
  email: string
  role: ProjectRole
}
type WebhookPayload = {
  name: string
  url: string
  status?: ProjectWebhookStatus
  events: ProjectWebhookEvent[]
}

async function request<T>(
  path: string,
  getProjectId?: ProjectIdGetter,
  options?: Parameters<typeof $fetch<T>>[1],
) {
  const headers = new Headers(options?.headers as HeadersInit | undefined)
  const projectId = getProjectId?.()

  if (projectId) {
    headers.set('x-conteful-project-id', projectId)
  }

  return $fetch<T>(path, {
    ...options,
    headers,
  })
}

export function createAdminRepository(getProjectId?: ProjectIdGetter) {
  return {
    getSession() {
      return request<ApiItemResponse<AuthSession | null>>('/api/v1/auth/session', getProjectId)
    },

    getDashboard() {
      return request<DashboardSnapshot>('/api/v1/admin/dashboard', getProjectId)
    },

    login(payload: LoginPayload) {
      return request<ApiMutationResponse<AuthSession>>('/api/v1/auth/login', getProjectId, {
        method: 'POST',
        body: payload,
      })
    },

    logout() {
      return request<ApiMutationResponse<{ success: boolean }>>('/api/v1/auth/logout', getProjectId, {
        method: 'POST',
      })
    },

    listProjects() {
      return request<ApiListResponse<Project>>('/api/v1/admin/projects', getProjectId)
    },

    getProject(id: string) {
      return request<ApiItemResponse<ProjectDetail>>(`/api/v1/admin/projects/${id}`, getProjectId)
    },

    createProject(payload: ProjectPayload) {
      return request<ApiMutationResponse<Project>>('/api/v1/admin/projects', getProjectId, {
        method: 'POST',
        body: payload,
      })
    },

    switchProject(id: string) {
      return request<ApiMutationResponse<AuthSession>>(`/api/v1/admin/projects/${id}/switch`, getProjectId, {
        method: 'POST',
      })
    },

    listInvites() {
      return request<ApiListResponse<ProjectInvite>>('/api/v1/admin/invites', getProjectId)
    },

    createInvite(payload: InvitePayload) {
      return request<ApiMutationResponse<ProjectInvite>>('/api/v1/admin/invites', getProjectId, {
        method: 'POST',
        body: payload,
      })
    },

    revokeInvite(id: string) {
      return request<ApiMutationResponse<ProjectInvite>>(`/api/v1/admin/invites/${id}`, getProjectId, {
        method: 'DELETE',
      })
    },

    acceptInvite(token: string) {
      return request<ApiMutationResponse<AuthSession>>(`/api/v1/invites/${token}/accept`, getProjectId, {
        method: 'POST',
      })
    },

    listWebhooks() {
      return request<ApiListResponse<ProjectWebhook>>('/api/v1/admin/webhooks', getProjectId)
    },

    createWebhook(payload: WebhookPayload) {
      return request<ApiMutationResponse<ProjectWebhook>>('/api/v1/admin/webhooks', getProjectId, {
        method: 'POST',
        body: payload,
      })
    },

    updateWebhook(id: string, payload: Partial<WebhookPayload>) {
      return request<ApiMutationResponse<ProjectWebhook>>(`/api/v1/admin/webhooks/${id}`, getProjectId, {
        method: 'PATCH',
        body: payload,
      })
    },

    deleteWebhook(id: string) {
      return request<ApiMutationResponse<ProjectWebhook>>(`/api/v1/admin/webhooks/${id}`, getProjectId, {
        method: 'DELETE',
      })
    },

    testWebhook(id: string) {
      return request<ApiMutationResponse<ProjectWebhook>>(`/api/v1/admin/webhooks/${id}/deliver`, getProjectId, {
        method: 'POST',
      })
    },

    listModels() {
      return request<ApiListResponse<ContentModel>>('/api/v1/admin/models', getProjectId)
    },

    getModel(id: string) {
      return request<ApiItemResponse<ContentModel>>(`/api/v1/admin/models/${id}`, getProjectId)
    },

    createModel(payload: ModelPayload) {
      return request<ApiMutationResponse<ContentModel>>('/api/v1/admin/models', getProjectId, {
        method: 'POST',
        body: payload,
      })
    },

    updateModel(id: string, payload: ModelPayload) {
      return request<ApiMutationResponse<ContentModel>>(`/api/v1/admin/models/${id}`, getProjectId, {
        method: 'PATCH',
        body: payload,
      })
    },

    deleteModel(id: string) {
      return request<ApiMutationResponse<ContentModel>>(`/api/v1/admin/models/${id}`, getProjectId, {
        method: 'DELETE',
      })
    },

    listEntries(modelId?: string) {
      return request<ApiListResponse<ContentEntry>>('/api/v1/admin/entries', getProjectId, {
        query: modelId ? { modelId } : undefined,
      })
    },

    getEntry(id: string) {
      return request<ApiItemResponse<ContentEntry>>(`/api/v1/admin/entries/${id}`, getProjectId)
    },

    createEntry(payload: EntryPayload) {
      return request<ApiMutationResponse<ContentEntry>>('/api/v1/admin/entries', getProjectId, {
        method: 'POST',
        body: payload,
      })
    },

    updateEntry(id: string, payload: EntryPayload) {
      return request<ApiMutationResponse<ContentEntry>>(`/api/v1/admin/entries/${id}`, getProjectId, {
        method: 'PATCH',
        body: payload,
      })
    },

    deleteEntry(id: string) {
      return request<ApiMutationResponse<ContentEntry>>(`/api/v1/admin/entries/${id}`, getProjectId, {
        method: 'DELETE',
      })
    },

    listMedia() {
      return request<ApiListResponse<MediaItem>>('/api/v1/admin/media', getProjectId)
    },

    getMedia(id: string) {
      return request<ApiItemResponse<MediaItem>>(`/api/v1/admin/media/${id}`, getProjectId)
    },

    createMedia(payload: MediaPayload) {
      return request<ApiMutationResponse<MediaItem>>('/api/v1/admin/media', getProjectId, {
        method: 'POST',
        body: payload,
      })
    },

    updateMedia(id: string, payload: MediaPayload) {
      return request<ApiMutationResponse<MediaItem>>(`/api/v1/admin/media/${id}`, getProjectId, {
        method: 'PATCH',
        body: payload,
      })
    },

    deleteMedia(id: string) {
      return request<ApiMutationResponse<MediaItem>>(`/api/v1/admin/media/${id}`, getProjectId, {
        method: 'DELETE',
      })
    },

    listTokens() {
      return request<ApiListResponse<ApiToken>>('/api/v1/admin/tokens', getProjectId)
    },

    createToken(payload: TokenPayload) {
      return request<ApiMutationResponse<ApiToken>>('/api/v1/admin/tokens', getProjectId, {
        method: 'POST',
        body: payload,
      })
    },

    invalidateToken(id: string) {
      return request<ApiMutationResponse<ApiToken>>(`/api/v1/admin/tokens/${id}`, getProjectId, {
        method: 'DELETE',
      })
    },
  }
}

export const adminRepository = createAdminRepository()

export type {
  EntryPayload,
  InvitePayload,
  LoginPayload,
  MediaPayload,
  ModelPayload,
  ProjectPayload,
  TokenPayload,
  WebhookPayload,
}
