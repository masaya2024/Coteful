export type ContentFieldType =
  | 'text'
  | 'textarea'
  | 'richText'
  | 'number'
  | 'boolean'
  | 'date'
  | 'json'
  | 'media'
  | 'reference'

export type ContentModelStatus = 'active' | 'draft'
export type ContentEntryStatus = 'draft' | 'published'
export type ApiTokenType = 'delivery' | 'management'
export type ApiTokenStatus = 'active' | 'revoked'
export type ProjectEnvironment = 'production' | 'staging' | 'preview'
export type ProjectRole = 'owner' | 'admin' | 'editor' | 'viewer'
export type ProjectInviteStatus = 'pending' | 'accepted' | 'revoked'
export type ProjectWebhookStatus = 'active' | 'paused'
export type ProjectWebhookEvent =
  | 'entry.published'
  | 'entry.updated'
  | 'entry.deleted'
  | 'media.updated'
  | 'model.updated'

export type JsonPrimitive = string | number | boolean | null
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }

export interface ContentFieldValidation {
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  options?: string[]
  referenceModelId?: string | null
  allowedMimeTypes?: string[]
}

export interface ContentField {
  id: string
  name: string
  key: string
  apiKey: string
  type: ContentFieldType
  required: boolean
  unique: boolean
  isTitle: boolean
  showInList: boolean
  validation: ContentFieldValidation
  order: number
  referenceModelId?: string | null
  description?: string
}

export interface ContentModel {
  id: string
  projectId: string
  name: string
  apiId: string
  description: string
  status: ContentModelStatus
  titleFieldKey?: string | null
  slugFieldKey?: string | null
  listFieldKeys: string[]
  fields: ContentField[]
  createdAt: string
  updatedAt: string
}

export interface ContentEntry {
  id: string
  projectId: string
  modelId: string
  title: string
  slug: string
  status: ContentEntryStatus
  fields: Record<string, JsonValue>
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface EntryReferenceSummary {
  id: string
  projectId: string
  modelId: string
  title: string
  slug: string
  status: ContentEntryStatus
}

export interface MediaItem {
  id: string
  projectId: string
  fileName: string
  url: string
  mimeType: string
  size: number
  alt: string
  description: string
  tags: string[]
  linkedEntryCount: number
  createdAt: string
  updatedAt: string
}

export interface ApiToken {
  id: string
  projectId: string
  name: string
  token: string
  type: ApiTokenType
  status: ApiTokenStatus
  scopes: string[]
  lastUsedAt: string | null
  expiresAt: string | null
  createdAt: string
  updatedAt: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  password: string
  title: string
}

export interface ProjectMembership {
  id: string
  projectId: string
  userId: string
  role: ProjectRole
  joinedAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  slug: string
  description: string
  environment: ProjectEnvironment
  role: ProjectRole
  memberCount: number
  createdAt: string
  updatedAt: string
}

export interface ProjectInvite {
  id: string
  projectId: string
  projectName: string
  email: string
  role: ProjectRole
  status: ProjectInviteStatus
  token: string
  invitedByUserId: string
  invitedByName?: string
  acceptedByUserId?: string | null
  createdAt: string
  updatedAt: string
  acceptedAt: string | null
}

export interface ProjectWebhook {
  id: string
  projectId: string
  name: string
  url: string
  status: ProjectWebhookStatus
  events: ProjectWebhookEvent[]
  secret: string
  lastDeliveredAt: string | null
  lastStatusCode: number | null
  lastEvent?: ProjectWebhookEvent | null
  failureCount: number
  createdAt: string
  updatedAt: string
}

export interface SafeAdminUser {
  id: string
  name: string
  email: string
  title: string
}

export interface AuthSession {
  sessionId: string
  user: SafeAdminUser
  activeProject: Project | null
  projects: Project[]
  pendingInvites: ProjectInvite[]
  activeProjectId?: string | null
  availableProjects?: Project[]
  lastLoginAt?: string
}

export interface SessionRecord {
  id: string
  userId: string
  activeProjectId: string | null
  createdAt: string
  updatedAt: string
}

export interface ProjectMember extends ProjectMembership {
  user: SafeAdminUser
}

export type ProjectInviteSummary = ProjectInvite

export interface ProjectSummary extends Project {
  isCurrent: boolean
  pendingInviteCount: number
  modelCount: number
  entryCount: number
  mediaCount: number
  tokenCount: number
  webhookCount: number
}

export interface ProjectDetail extends ProjectSummary {
  members: ProjectMember[]
  invites: ProjectInvite[]
  webhooks: ProjectWebhook[]
}

export interface DashboardSnapshot {
  project: ProjectSummary | null
  counts: {
    models: number
    entries: number
    media: number
    tokens: number
    webhooks: number
  }
  recentModels: ContentModel[]
  recentEntries: ContentEntry[]
  recentMedia: MediaItem[]
  pendingInvites: ProjectInvite[]
}

export type WebhookEvent = ProjectWebhookEvent
export type WebhookStatus = ProjectWebhookStatus

export interface SelectOption {
  label: string
  value: string
  description?: string
}

export interface ApiResponseMeta {
  timestamp: string
  version: 'v1'
  filters?: Record<string, string | number | boolean | undefined>
}

export interface ApiListResponse<T> {
  items: T[]
  total: number
  meta: ApiResponseMeta
}

export interface ApiItemResponse<T> {
  item: T
  meta: ApiResponseMeta
}

export interface ApiMutationResponse<T> {
  item: T
  message: string
  meta: ApiResponseMeta
}

export interface DeliveryContentItem {
  id: string
  projectId: string
  modelId: string
  modelApiId: string
  title: string
  slug: string
  status: ContentEntryStatus
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  fields: Record<string, JsonValue | MediaItem | EntryReferenceSummary | null>
}
