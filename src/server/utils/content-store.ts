import { createError } from 'h3'
import {
  adminUsers,
  apiTokens,
  contentEntries,
  contentModels,
  mediaItems,
  projectInvites,
  projectMemberships,
  projects,
  projectWebhooks,
} from '../../mocks/mock-data'
import type {
  AdminUser,
  ApiToken,
  ApiTokenStatus,
  ApiTokenType,
  AuthSession,
  ContentEntry,
  ContentEntryStatus,
  ContentField,
  ContentFieldType,
  ContentModel,
  DashboardSnapshot,
  DeliveryContentItem,
  EntryReferenceSummary,
  JsonValue,
  MediaItem,
  ProjectDetail,
  Project,
  ProjectInvite,
  ProjectInviteStatus,
  ProjectMembership,
  ProjectMember,
  ProjectRole,
  ProjectSummary,
  ProjectWebhook,
  ProjectWebhookEvent,
  ProjectWebhookStatus,
  SafeAdminUser,
} from '../../types'

interface SessionRecord {
  id: string
  userId: string
  activeProjectId: string | null
  createdAt: string
  updatedAt: string
}

interface StoreState {
  users: AdminUser[]
  projects: Project[]
  memberships: ProjectMembership[]
  invites: ProjectInvite[]
  webhooks: ProjectWebhook[]
  models: ContentModel[]
  entries: ContentEntry[]
  media: MediaItem[]
  tokens: ApiToken[]
  sessions: SessionRecord[]
}

type GlobalStore = typeof globalThis & {
  __contefulMockStore?: StoreState
}

interface ProjectFilters {
  q?: string
}

interface ModelFilters {
  q?: string
}

interface EntryFilters {
  q?: string
  modelId?: string
  status?: ContentEntryStatus
}

interface MediaFilters {
  q?: string
  tag?: string
}

interface TokenFilters {
  type?: ApiTokenType
  status?: ApiTokenStatus
}

interface InviteFilters {
  status?: ProjectInviteStatus
}

interface WebhookFilters {
  status?: ProjectWebhookStatus
}

interface RequestScope {
  sessionId?: string
  projectId?: string
}

const storeHost = globalThis as GlobalStore

function clone<T>(value: T): T {
  return structuredClone(value)
}

function nowIso(): string {
  return new Date().toISOString()
}

function createId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

function createInitialStore(): StoreState {
  return {
    users: clone(adminUsers),
    projects: clone(projects),
    memberships: clone(projectMemberships),
    invites: clone(projectInvites),
    webhooks: clone(projectWebhooks),
    models: clone(contentModels),
    entries: clone(contentEntries),
    media: clone(mediaItems),
    tokens: clone(apiTokens),
    sessions: [],
  }
}

function getStore(): StoreState {
  if (!storeHost.__contefulMockStore) {
    storeHost.__contefulMockStore = createInitialStore()
  }

  return storeHost.__contefulMockStore
}

function sortByUpdatedAt<T extends { updatedAt: string }>(items: T[]): T[] {
  return [...items].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeIdentifier(value: string): string {
  const cleaned = value
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')

  if (!cleaned) {
    return ''
  }

  const [first, ...rest] = cleaned.split(' ')
  return [
    first.charAt(0).toLowerCase() + first.slice(1),
    ...rest.map(part => part.charAt(0).toUpperCase() + part.slice(1)),
  ].join('')
}

function normalizeFieldType(value?: string): ContentFieldType {
  const allowed: ContentFieldType[] = [
    'text',
    'textarea',
    'richText',
    'number',
    'boolean',
    'date',
    'json',
    'media',
    'reference',
  ]

  if (!value || !allowed.includes(value as ContentFieldType)) {
    return 'text'
  }

  return value as ContentFieldType
}

function normalizeField(field: Partial<ContentField>, index: number): ContentField {
  const displayName = field.name?.trim() || `Field ${index + 1}`
  const key = normalizeIdentifier(field.key || field.apiKey || displayName)
  const apiKey = normalizeIdentifier(field.apiKey || field.key || displayName)

  return {
    id: field.id || createId('fld'),
    name: displayName,
    key: key || `field${index + 1}`,
    apiKey: apiKey || `field${index + 1}`,
    type: normalizeFieldType(field.type),
    required: Boolean(field.required),
    unique: Boolean(field.unique),
    isTitle: Boolean(field.isTitle),
    showInList: field.showInList ?? Boolean(field.isTitle),
    validation: field.validation || {},
    order: field.order || index + 1,
    referenceModelId: field.referenceModelId || field.validation?.referenceModelId || null,
    description: field.description?.trim() || '',
  }
}

function normalizeModelPayload(input: Partial<ContentModel>, projectId: string): ContentModel {
  const timestamp = nowIso()
  const rawFields = input.fields || []
  const fields = rawFields
    .map((field, index) => normalizeField(field, index))
    .sort((left, right) => left.order - right.order)

  const name = input.name?.trim() || 'Untitled Model'
  const apiId = slugify(input.apiId || name)
  const titleFieldKey = input.titleFieldKey || fields.find(field => field.isTitle)?.key || fields[0]?.key || null
  const slugFieldKey = input.slugFieldKey || fields.find(field => field.key === 'slug')?.key || null

  return {
    id: input.id || createId('mdl'),
    projectId,
    name,
    apiId: apiId || createId('model'),
    description: input.description?.trim() || '',
    status: input.status || 'active',
    titleFieldKey,
    slugFieldKey,
    listFieldKeys: input.listFieldKeys?.length
      ? input.listFieldKeys
      : fields.filter(field => field.showInList).map(field => field.key),
    fields,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
  }
}

function matchesSearch(value: string, search?: string): boolean {
  if (!search) {
    return true
  }

  return value.toLowerCase().includes(search.trim().toLowerCase())
}

function toSafeUser(user: AdminUser): SafeAdminUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    title: user.title,
  }
}

function getUserOrThrow(id: string): AdminUser {
  const user = getStore().users.find(item => item.id === id)
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: `User ${id} was not found.`,
    })
  }

  return user
}

function getProjectOrThrow(id: string): Project {
  const project = getStore().projects.find(item => item.id === id)
  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: `Project ${id} was not found.`,
    })
  }

  return project
}

function getModelOrThrow(id: string, projectId?: string): ContentModel {
  const model = getStore().models.find(item => item.id === id && (!projectId || item.projectId === projectId))
  if (!model) {
    throw createError({
      statusCode: 404,
      statusMessage: `Model ${id} was not found.`,
    })
  }

  return model
}

function getEntryOrThrow(id: string, projectId?: string): ContentEntry {
  const entry = getStore().entries.find(item => item.id === id && (!projectId || item.projectId === projectId))
  if (!entry) {
    throw createError({
      statusCode: 404,
      statusMessage: `Entry ${id} was not found.`,
    })
  }

  return entry
}

function getMediaOrThrow(id: string, projectId?: string): MediaItem {
  const item = getStore().media.find(media => media.id === id && (!projectId || media.projectId === projectId))
  if (!item) {
    throw createError({
      statusCode: 404,
      statusMessage: `Media ${id} was not found.`,
    })
  }

  return item
}

function getTokenOrThrow(id: string, projectId?: string): ApiToken {
  const token = getStore().tokens.find(item => item.id === id && (!projectId || item.projectId === projectId))
  if (!token) {
    throw createError({
      statusCode: 404,
      statusMessage: `Token ${id} was not found.`,
    })
  }

  return token
}

function getInviteOrThrow(id: string): ProjectInvite {
  const invite = getStore().invites.find(item => item.id === id)
  if (!invite) {
    throw createError({
      statusCode: 404,
      statusMessage: `Invite ${id} was not found.`,
    })
  }

  return invite
}

function getInviteByTokenOrThrow(token: string): ProjectInvite {
  const invite = getStore().invites.find(item => item.token === token || item.id === token)
  if (!invite) {
    throw createError({
      statusCode: 404,
      statusMessage: `Invite token ${token} was not found.`,
    })
  }

  return invite
}

function getWebhookOrThrow(id: string, projectId?: string): ProjectWebhook {
  const webhook = getStore().webhooks.find(item => item.id === id && (!projectId || item.projectId === projectId))
  if (!webhook) {
    throw createError({
      statusCode: 404,
      statusMessage: `Webhook ${id} was not found.`,
    })
  }

  return webhook
}

function getSessionRecordOrThrow(sessionId: string): SessionRecord {
  const session = getStore().sessions.find(item => item.id === sessionId)
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Session not found.',
    })
  }

  return session
}

function getMembership(projectId: string, userId: string): ProjectMembership | null {
  return getStore().memberships.find(item => item.projectId === projectId && item.userId === userId) || null
}

function getProjectMemberCount(projectId: string): number {
  return getStore().memberships.filter(item => item.projectId === projectId).length
}

function buildProjectSummary(projectId: string, userId: string): Project {
  const project = getProjectOrThrow(projectId)
  const membership = getMembership(projectId, userId)

  if (!membership) {
    throw createError({
      statusCode: 403,
      statusMessage: `User ${userId} does not belong to project ${projectId}.`,
    })
  }

  return {
    ...clone(project),
    role: membership.role,
    memberCount: getProjectMemberCount(projectId),
  }
}

function buildPendingInvites(email: string): ProjectInvite[] {
  return sortByUpdatedAt(getStore().invites)
    .filter(invite => invite.email === email)
    .filter(invite => invite.status === 'pending')
    .map(invite => clone(invite))
}

function buildAuthSession(record: SessionRecord): AuthSession {
  const user = getUserOrThrow(record.userId)
  const projectsForUser = getStore().memberships
    .filter(item => item.userId === record.userId)
    .map(item => buildProjectSnapshot(item.projectId, record.userId, record.activeProjectId))
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))

  const activeProject = record.activeProjectId
    ? projectsForUser.find(project => project.id === record.activeProjectId) || projectsForUser[0] || null
    : projectsForUser[0] || null

  return {
    sessionId: record.id,
    user: toSafeUser(user),
    activeProject,
    projects: projectsForUser,
    pendingInvites: buildPendingInvites(user.email),
    activeProjectId: activeProject?.id || record.activeProjectId || null,
    availableProjects: projectsForUser,
    lastLoginAt: record.updatedAt,
  }
}

function ensureMemberProject(projectId: string, userId: string): ProjectMembership {
  const membership = getMembership(projectId, userId)
  if (!membership) {
    throw createError({
      statusCode: 403,
      statusMessage: `User ${userId} is not a member of project ${projectId}.`,
    })
  }

  return membership
}

function ensureProjectManager(projectId: string, userId: string): ProjectMembership {
  const membership = ensureMemberProject(projectId, userId)
  if (!['owner', 'admin'].includes(membership.role)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only owners or admins can manage invites for this project.',
    })
  }

  return membership
}

function getScopedProjectId(sessionId?: string, requestedProjectId?: string | null): string {
  if (requestedProjectId) {
    return requestedProjectId
  }

  if (sessionId) {
    const session = getSessionRecordOrThrow(sessionId)
    if (session.activeProjectId) {
      return session.activeProjectId
    }
  }

  const fallback = getStore().projects[0]?.id
  if (!fallback) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No project is available.',
    })
  }

  return fallback
}

function getSessionIdFromScope(scope?: RequestScope): string {
  const sessionId = scope?.sessionId
  if (!sessionId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication is required.',
    })
  }

  return sessionId
}

function getProjectIdFromScope(scope?: RequestScope | string): string {
  if (typeof scope === 'string') {
    return scope
  }

  return getScopedProjectId(scope?.sessionId, scope?.projectId)
}

function getUserIdFromScope(scope?: RequestScope): string {
  const sessionId = getSessionIdFromScope(scope)
  return getSessionRecordOrThrow(sessionId).userId
}

function getProjectCounts(projectId: string) {
  return {
    modelCount: getStore().models.filter(item => item.projectId === projectId).length,
    entryCount: getStore().entries.filter(item => item.projectId === projectId).length,
    mediaCount: getStore().media.filter(item => item.projectId === projectId).length,
    tokenCount: getStore().tokens.filter(item => item.projectId === projectId).length,
    webhookCount: getStore().webhooks.filter(item => item.projectId === projectId).length,
  }
}

function buildProjectSnapshot(projectId: string, userId: string, currentProjectId?: string | null): ProjectSummary {
  const project = buildProjectSummary(projectId, userId)
  const counts = getProjectCounts(projectId)

  return {
    ...project,
    ...counts,
    isCurrent: project.id === currentProjectId,
    pendingInviteCount: getStore().invites.filter(invite => invite.projectId === projectId && invite.status === 'pending').length,
  }
}

function buildProjectMembers(projectId: string): ProjectMember[] {
  return getStore().memberships
    .filter(item => item.projectId === projectId)
    .map(item => ({
      ...clone(item),
      user: toSafeUser(getUserOrThrow(item.userId)),
    }))
}

function isIdInValue(value: JsonValue, id: string): boolean {
  if (typeof value === 'string') {
    return value === id
  }

  if (Array.isArray(value)) {
    return value.some(item => isIdInValue(item, id))
  }

  if (value && typeof value === 'object') {
    return Object.values(value).some(item => isIdInValue(item, id))
  }

  return false
}

function countLinkedEntries(id: string, projectId: string): number {
  return getStore().entries.filter(entry => {
    if (entry.projectId !== projectId) {
      return false
    }

    return Object.values(entry.fields).some(value => isIdInValue(value, id))
  }).length
}

function withMediaStats(item: MediaItem): MediaItem {
  return {
    ...clone(item),
    linkedEntryCount: countLinkedEntries(item.id, item.projectId),
  }
}

function buildEntryReference(entryId: string, projectId: string): EntryReferenceSummary | null {
  const entry = getStore().entries.find(item => item.id === entryId && item.projectId === projectId)
  if (!entry) {
    return null
  }

  return {
    id: entry.id,
    projectId: entry.projectId,
    modelId: entry.modelId,
    title: entry.title,
    slug: entry.slug,
    status: entry.status,
  }
}

function resolveFieldValue(field: ContentField, value: JsonValue | undefined, projectId: string): JsonValue | MediaItem | EntryReferenceSummary | null {
  if (typeof value === 'undefined' || value === null) {
    return null
  }

  if (field.type === 'media' && typeof value === 'string') {
    const media = getStore().media.find(item => item.id === value && item.projectId === projectId)
    return media ? withMediaStats(media) : null
  }

  if (field.type === 'reference' && typeof value === 'string') {
    return buildEntryReference(value, projectId)
  }

  return value
}

function deriveEntryTitle(model: ContentModel, fields: Record<string, JsonValue>, fallback?: string): string {
  const titleKey = model.titleFieldKey || model.fields.find(field => field.isTitle)?.key
  if (titleKey) {
    const titleValue = fields[titleKey]
    if (typeof titleValue === 'string' && titleValue.trim()) {
      return titleValue.trim()
    }
  }

  return fallback?.trim() || `${model.name} Entry`
}

function deriveEntrySlug(model: ContentModel, fields: Record<string, JsonValue>, title: string, fallback?: string): string {
  const slugKey = model.slugFieldKey
  if (slugKey) {
    const slugValue = fields[slugKey]
    if (typeof slugValue === 'string' && slugValue.trim()) {
      return slugify(slugValue)
    }
  }

  return slugify(fallback || title) || createId('entry')
}

function createDeliveryItem(entry: ContentEntry): DeliveryContentItem {
  const model = getModelOrThrow(entry.modelId, entry.projectId)
  const fields = Object.fromEntries(
    model.fields
      .sort((left, right) => left.order - right.order)
      .map(field => [field.apiKey, resolveFieldValue(field, entry.fields[field.key], entry.projectId)]),
  )

  return {
    id: entry.id,
    projectId: entry.projectId,
    modelId: model.id,
    modelApiId: model.apiId,
    title: entry.title,
    slug: entry.slug,
    status: entry.status,
    publishedAt: entry.publishedAt,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
    fields,
  }
}

function touchProject(projectId: string) {
  const store = getStore()
  const project = getProjectOrThrow(projectId)
  const next = {
    ...project,
    updatedAt: nowIso(),
  }
  const index = store.projects.findIndex(item => item.id === projectId)
  store.projects.splice(index, 1, next)
}

function touchProjectWebhooks(projectId: string, eventName: ProjectWebhookEvent) {
  const store = getStore()
  const timestamp = nowIso()
  store.webhooks = store.webhooks.map(webhook => {
    if (webhook.projectId !== projectId || webhook.status !== 'active' || !webhook.events.includes(eventName)) {
      return webhook
    }

    return {
      ...webhook,
      lastDeliveredAt: timestamp,
      lastStatusCode: 202,
      failureCount: 0,
      updatedAt: timestamp,
    }
  })
  touchProject(projectId)
}

export function getSessionById(sessionId: string): AuthSession {
  return buildAuthSession(getSessionRecordOrThrow(sessionId))
}

export function getAuthSession(scope: RequestScope): AuthSession | null {
  if (!scope.sessionId) {
    return null
  }

  try {
    return buildAuthSession(getSessionRecordOrThrow(scope.sessionId))
  } catch {
    return null
  }
}

export function listLoginOptions() {
  return {
    accounts: getStore().users.map(user => ({
      name: user.name,
      email: user.email,
      title: user.title,
    })),
    passwordHint: 'demo-pass',
  }
}

export function login(input: { email: string, password: string } | string, password?: string): AuthSession {
  const email = typeof input === 'string' ? input : input.email
  const secret = typeof input === 'string' ? password || '' : input.password
  const user = getStore().users.find(item => item.email === email.trim().toLowerCase())

  if (!user || user.password !== secret) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid login credentials.',
    })
  }

  const membership = getStore().memberships.find(item => item.userId === user.id)
  const session: SessionRecord = {
    id: createId('sess'),
    userId: user.id,
    activeProjectId: membership?.projectId || null,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  }

  getStore().sessions = getStore().sessions.filter(item => item.userId !== user.id)
  getStore().sessions.unshift(session)

  return buildAuthSession(session)
}

export function logout(scope?: RequestScope | string): { success: boolean } {
  const sessionId = typeof scope === 'string' ? scope : scope?.sessionId
  if (!sessionId) {
    return { success: true }
  }

  getStore().sessions = getStore().sessions.filter(item => item.id !== sessionId)
  return { success: true }
}

export function switchProject(projectIdOrSessionId: string, scopeOrProjectId: RequestScope | string): AuthSession {
  const store = getStore()
  const sessionId = typeof scopeOrProjectId === 'string'
    ? projectIdOrSessionId
    : getSessionIdFromScope(scopeOrProjectId)
  const projectId = typeof scopeOrProjectId === 'string'
    ? scopeOrProjectId
    : projectIdOrSessionId
  const session = getSessionRecordOrThrow(sessionId)
  ensureMemberProject(projectId, session.userId)

  const next = {
    ...session,
    activeProjectId: projectId,
    updatedAt: nowIso(),
  }

  const index = store.sessions.findIndex(item => item.id === sessionId)
  store.sessions.splice(index, 1, next)
  touchProject(projectId)
  return buildAuthSession(next)
}

export function listProjects(filters: ProjectFilters = {}, scope: RequestScope): ProjectSummary[] {
  const { q } = filters
  const userId = getUserIdFromScope(scope)
  const currentProjectId = getAuthSession(scope)?.activeProjectId || null

  return getStore().memberships
    .filter(item => item.userId === userId)
    .map(item => buildProjectSnapshot(item.projectId, userId, currentProjectId))
    .filter(project => matchesSearch(`${project.name} ${project.slug} ${project.description}`, q))
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
}

export function getProjectById(id: string, scope: RequestScope): ProjectDetail {
  const userId = getUserIdFromScope(scope)
  const currentProjectId = getAuthSession(scope)?.activeProjectId || null
  ensureMemberProject(id, userId)

  return {
    ...buildProjectSnapshot(id, userId, currentProjectId),
    members: buildProjectMembers(id),
    invites: listInvites({ projectId: id }, scope),
    webhooks: listWebhooks(scope, { projectId: id }),
  }
}

export function createProject(input: Partial<Project>, scope: RequestScope): ProjectSummary {
  const userId = getUserIdFromScope(scope)
  const store = getStore()
  const timestamp = nowIso()
  const name = input.name?.trim() || 'Untitled Project'
  const project: Project = {
    id: input.id || createId('prj'),
    name,
    slug: slugify(input.slug || name) || createId('project'),
    description: input.description?.trim() || '',
    environment: input.environment || 'staging',
    role: 'owner',
    memberCount: 1,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
  }

  store.projects.unshift(project)
  store.memberships.unshift({
    id: createId('pm'),
    projectId: project.id,
    userId,
    role: 'owner',
    joinedAt: timestamp,
    updatedAt: timestamp,
  })

  const sessionId = getSessionIdFromScope(scope)
  const session = getSessionRecordOrThrow(sessionId)
  session.activeProjectId = project.id
  session.updatedAt = timestamp

  return buildProjectSnapshot(project.id, userId, project.id)
}

export function updateProject(id: string, input: Partial<Project>, scope: RequestScope): ProjectSummary {
  const store = getStore()
  const userId = getUserIdFromScope(scope)
  ensureProjectManager(id, userId)
  const current = getProjectOrThrow(id)
  const next: Project = {
    ...clone(current),
    ...clone(input),
    id: current.id,
    slug: slugify(input.slug || current.slug) || current.slug,
    updatedAt: nowIso(),
  }

  const index = store.projects.findIndex(project => project.id === id)
  store.projects.splice(index, 1, next)
  return buildProjectSnapshot(id, userId, getAuthSession(scope)?.activeProjectId || null)
}

export function listInvites(filters: InviteFilters & { email?: string, projectId?: string } = {}, scope: RequestScope): ProjectInvite[] {
  const { status, email } = filters
  const projectId = filters.projectId || getProjectIdFromScope(scope)

  return sortByUpdatedAt(getStore().invites)
    .filter(invite => invite.projectId === projectId)
    .filter(invite => !status || invite.status === status)
    .filter(invite => !email || invite.email === email)
    .map(invite => clone(invite))
}

export function createInvite(input: Partial<ProjectInvite> & { projectId?: string }, scope: RequestScope): ProjectInvite {
  const projectId = input.projectId || getProjectIdFromScope(scope)
  const userId = getUserIdFromScope(scope)
  ensureProjectManager(projectId, userId)

  const store = getStore()
  const project = getProjectOrThrow(projectId)
  const email = input.email?.trim().toLowerCase()
  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invite email is required.',
    })
  }

  const existingMember = store.users.find(user => user.email === email)
  if (existingMember && getMembership(projectId, existingMember.id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'This user already belongs to the project.',
    })
  }

  const pending = store.invites.find(invite => invite.projectId === projectId && invite.email === email && invite.status === 'pending')
  if (pending) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A pending invite already exists for this email.',
    })
  }

  const timestamp = nowIso()
  const invite: ProjectInvite = {
    id: input.id || createId('inv'),
    projectId,
    projectName: project.name,
    email,
    role: input.role || 'editor',
    status: 'pending',
    token: input.token || createId('invite'),
    invitedByUserId: userId,
    createdAt: timestamp,
    updatedAt: timestamp,
    acceptedAt: null,
  }

  store.invites.unshift(invite)
  touchProject(projectId)
  return clone(invite)
}

export function revokeInvite(id: string, scope: RequestScope): ProjectInvite {
  const userId = getUserIdFromScope(scope)
  const store = getStore()
  const current = getInviteOrThrow(id)
  ensureProjectManager(current.projectId, userId)

  const next: ProjectInvite = {
    ...clone(current),
    status: 'revoked',
    updatedAt: nowIso(),
  }

  const index = store.invites.findIndex(invite => invite.id === id)
  store.invites.splice(index, 1, next)
  touchProject(current.projectId)
  return clone(next)
}

export function acceptInvite(token: string, scope: RequestScope | string): AuthSession {
  const store = getStore()
  const sessionId = typeof scope === 'string' ? scope : getSessionIdFromScope(scope)
  const session = getSessionRecordOrThrow(sessionId)
  const current = getInviteByTokenOrThrow(token)
  const user = getUserOrThrow(session.userId)

  if (current.email !== user.email) {
    throw createError({
      statusCode: 403,
      statusMessage: 'This invite does not belong to the current user.',
    })
  }

  if (current.status !== 'pending') {
    throw createError({
      statusCode: 400,
      statusMessage: 'This invite is no longer pending.',
    })
  }

  if (!getMembership(current.projectId, user.id)) {
    store.memberships.unshift({
      id: createId('pm'),
      projectId: current.projectId,
      userId: user.id,
      role: current.role,
      joinedAt: nowIso(),
      updatedAt: nowIso(),
    })
  }

  const inviteIndex = store.invites.findIndex(invite => invite.id === current.id)
  store.invites.splice(inviteIndex, 1, {
    ...current,
    status: 'accepted',
    acceptedAt: nowIso(),
    updatedAt: nowIso(),
  })

  const sessionIndex = store.sessions.findIndex(item => item.id === sessionId)
  const nextSession: SessionRecord = {
    ...session,
    activeProjectId: current.projectId,
    updatedAt: nowIso(),
  }
  store.sessions.splice(sessionIndex, 1, nextSession)
  touchProject(current.projectId)

  return buildAuthSession(nextSession)
}

export function listWebhooks(scope: RequestScope | string, filters: WebhookFilters & { projectId?: string } = {}): ProjectWebhook[] {
  const { status } = filters
  const projectId = filters.projectId || getProjectIdFromScope(scope)

  return sortByUpdatedAt(getStore().webhooks)
    .filter(webhook => webhook.projectId === projectId)
    .filter(webhook => !status || webhook.status === status)
    .map(webhook => clone(webhook))
}

export function createWebhook(input: Partial<ProjectWebhook> & { projectId?: string }, scope: RequestScope | string): ProjectWebhook {
  const store = getStore()
  const timestamp = nowIso()
  const projectId = input.projectId || getProjectIdFromScope(scope)

  const webhook: ProjectWebhook = {
    id: input.id || createId('wh'),
    projectId,
    name: input.name?.trim() || 'Untitled webhook',
    url: input.url?.trim() || 'https://example.com/webhook',
    status: input.status || 'active',
    events: input.events?.length ? input.events : ['entry.published'],
    secret: input.secret || `whsec_${Math.random().toString(36).slice(2, 16)}`,
    lastDeliveredAt: input.lastDeliveredAt || null,
    lastStatusCode: input.lastStatusCode || null,
    failureCount: input.failureCount || 0,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
  }

  store.webhooks.unshift(webhook)
  touchProject(projectId)
  return clone(webhook)
}

export function updateWebhook(id: string, input: Partial<ProjectWebhook>, scope: RequestScope | string): ProjectWebhook {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const current = getWebhookOrThrow(id, projectId)
  const next: ProjectWebhook = {
    ...clone(current),
    ...clone(input),
    id: current.id,
    projectId: current.projectId,
    secret: current.secret,
    updatedAt: nowIso(),
  }

  const index = store.webhooks.findIndex(webhook => webhook.id === id)
  store.webhooks.splice(index, 1, next)
  touchProject(projectId)
  return clone(next)
}

export function deleteWebhook(id: string, scope: RequestScope | string): ProjectWebhook {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const current = getWebhookOrThrow(id, projectId)
  store.webhooks = store.webhooks.filter(webhook => webhook.id !== id)
  touchProject(projectId)
  return clone(current)
}

export function deliverWebhook(id: string, scope: RequestScope | string, eventName?: ProjectWebhookEvent): ProjectWebhook {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const current = getWebhookOrThrow(id, projectId)
  const timestamp = nowIso()
  const isActive = current.status === 'active'
  const next: ProjectWebhook = {
    ...clone(current),
    lastDeliveredAt: timestamp,
    lastStatusCode: isActive ? 202 : 409,
    lastEvent: eventName || current.lastEvent || null,
    failureCount: isActive ? 0 : current.failureCount + 1,
    updatedAt: timestamp,
  }

  const index = store.webhooks.findIndex(webhook => webhook.id === id)
  store.webhooks.splice(index, 1, next)
  touchProject(projectId)
  return clone(next)
}

export function listModels(filters: ModelFilters = {}, scope: RequestScope | string): ContentModel[] {
  const { q } = filters
  const projectId = getProjectIdFromScope(scope)

  return sortByUpdatedAt(getStore().models)
    .filter(model => model.projectId === projectId)
    .filter(model => matchesSearch(`${model.name} ${model.apiId} ${model.description}`, q))
    .map(model => clone(model))
}

export function getModelById(id: string, scope: RequestScope | string): ContentModel {
  const projectId = getProjectIdFromScope(scope)
  return clone(getModelOrThrow(id, projectId))
}

export function createModel(input: Partial<ContentModel>, scope: RequestScope | string): ContentModel {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const model = normalizeModelPayload(input, projectId)
  store.models.unshift(model)
  touchProjectWebhooks(projectId, 'model.updated')
  return clone(model)
}

export function updateModel(id: string, input: Partial<ContentModel>, scope: RequestScope | string): ContentModel {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const current = getModelOrThrow(id, projectId)
  const next = normalizeModelPayload({
    ...current,
    ...clone(input),
    id: current.id,
    createdAt: current.createdAt,
  }, projectId)

  const index = store.models.findIndex(model => model.id === id)
  store.models.splice(index, 1, next)
  touchProjectWebhooks(projectId, 'model.updated')
  return clone(next)
}

export function deleteModel(id: string, scope: RequestScope | string): ContentModel {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const current = getModelOrThrow(id, projectId)
  store.models = store.models.filter(model => model.id !== id)
  store.entries = store.entries.filter(entry => entry.modelId !== id)
  touchProjectWebhooks(projectId, 'model.updated')
  return clone(current)
}

export function listEntries(filters: EntryFilters = {}, scope: RequestScope | string): ContentEntry[] {
  const { q, modelId, status } = filters
  const projectId = getProjectIdFromScope(scope)

  return sortByUpdatedAt(getStore().entries)
    .filter(entry => entry.projectId === projectId)
    .filter(entry => !modelId || entry.modelId === modelId)
    .filter(entry => !status || entry.status === status)
    .filter(entry => matchesSearch(`${entry.title} ${entry.slug}`, q))
    .map(entry => clone(entry))
}

export function getEntryById(id: string, scope: RequestScope | string): ContentEntry {
  const projectId = getProjectIdFromScope(scope)
  return clone(getEntryOrThrow(id, projectId))
}

export function createEntry(input: Partial<ContentEntry>, scope: RequestScope | string): ContentEntry {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const model = getModelOrThrow(input.modelId || '', projectId)
  const fields = clone(input.fields || {})
  const title = deriveEntryTitle(model, fields, input.title)
  const status = input.status || 'draft'
  const entry: ContentEntry = {
    id: input.id || createId('ent'),
    projectId,
    modelId: model.id,
    title,
    slug: deriveEntrySlug(model, fields, title, input.slug),
    status,
    fields,
    publishedAt: status === 'published' ? input.publishedAt || nowIso() : null,
    createdAt: input.createdAt || nowIso(),
    updatedAt: nowIso(),
  }

  store.entries.unshift(entry)
  touchProjectWebhooks(projectId, status === 'published' ? 'entry.published' : 'entry.updated')
  return clone(entry)
}

export function updateEntry(id: string, input: Partial<ContentEntry>, scope: RequestScope | string): ContentEntry {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const current = getEntryOrThrow(id, projectId)
  const model = getModelOrThrow(input.modelId || current.modelId, projectId)
  const fields = {
    ...clone(current.fields),
    ...clone(input.fields || {}),
  }
  const status = input.status || current.status
  const title = deriveEntryTitle(model, fields, input.title || current.title)
  const next: ContentEntry = {
    ...clone(current),
    ...clone(input),
    projectId,
    modelId: model.id,
    title,
    slug: deriveEntrySlug(model, fields, title, input.slug || current.slug),
    status,
    fields,
    publishedAt:
      status === 'published'
        ? input.publishedAt || current.publishedAt || nowIso()
        : null,
    updatedAt: nowIso(),
  }

  const index = store.entries.findIndex(entry => entry.id === id)
  store.entries.splice(index, 1, next)
  touchProjectWebhooks(projectId, status === 'published' ? 'entry.published' : 'entry.updated')
  return clone(next)
}

export function deleteEntry(id: string, scope: RequestScope | string): ContentEntry {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const current = getEntryOrThrow(id, projectId)
  store.entries = store.entries.filter(entry => entry.id !== id)
  touchProjectWebhooks(projectId, 'entry.deleted')
  return clone(current)
}

export function listMedia(filters: MediaFilters = {}, scope: RequestScope | string): MediaItem[] {
  const { q, tag } = filters
  const projectId = getProjectIdFromScope(scope)

  return sortByUpdatedAt(getStore().media)
    .filter(item => item.projectId === projectId)
    .filter(item => matchesSearch(`${item.fileName} ${item.alt} ${item.description}`, q))
    .filter(item => !tag || item.tags.includes(tag))
    .map(item => withMediaStats(item))
}

export function getMediaById(id: string, scope: RequestScope | string): MediaItem {
  const projectId = getProjectIdFromScope(scope)
  return withMediaStats(getMediaOrThrow(id, projectId))
}

export function createMedia(input: Partial<MediaItem>, scope: RequestScope | string): MediaItem {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const timestamp = nowIso()
  const fileName = input.fileName?.trim() || `mock-${createId('asset')}.png`
  const item: MediaItem = {
    id: input.id || createId('med'),
    projectId,
    fileName,
    url: input.url || `https://placehold.co/1200x720/111111/FFFFFF/png?text=${encodeURIComponent(fileName)}`,
    mimeType: input.mimeType || 'image/png',
    size: input.size || 150000,
    alt: input.alt?.trim() || fileName,
    description: input.description?.trim() || '',
    tags: input.tags || [],
    linkedEntryCount: 0,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
  }

  store.media.unshift(item)
  touchProjectWebhooks(projectId, 'media.updated')
  return withMediaStats(item)
}

export function updateMedia(id: string, input: Partial<MediaItem>, scope: RequestScope | string): MediaItem {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const current = getMediaOrThrow(id, projectId)
  const next: MediaItem = {
    ...clone(current),
    ...clone(input),
    id: current.id,
    projectId: current.projectId,
    updatedAt: nowIso(),
    linkedEntryCount: current.linkedEntryCount,
  }

  const index = store.media.findIndex(item => item.id === id)
  store.media.splice(index, 1, next)
  touchProjectWebhooks(projectId, 'media.updated')
  return withMediaStats(next)
}

export function deleteMedia(id: string, scope: RequestScope | string): MediaItem {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const current = getMediaOrThrow(id, projectId)
  store.media = store.media.filter(item => item.id !== id)
  touchProjectWebhooks(projectId, 'media.updated')
  return withMediaStats(current)
}

export function listApiTokens(filters: TokenFilters = {}, scope: RequestScope | string): ApiToken[] {
  const { type, status } = filters
  const projectId = getProjectIdFromScope(scope)

  return sortByUpdatedAt(getStore().tokens)
    .filter(token => token.projectId === projectId)
    .filter(token => !type || token.type === type)
    .filter(token => !status || token.status === status)
    .map(token => clone(token))
}

export function getTokenById(id: string, scope: RequestScope | string): ApiToken {
  const projectId = getProjectIdFromScope(scope)
  return clone(getTokenOrThrow(id, projectId))
}

export function createApiToken(input: Partial<ApiToken>, scope: RequestScope | string): ApiToken {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const timestamp = nowIso()
  const type = input.type || 'delivery'
  const token: ApiToken = {
    id: input.id || createId('tok'),
    projectId,
    name: input.name?.trim() || `${type} token`,
    token: input.token || `ctf_${type === 'delivery' ? 'deliv' : 'mgmt'}_${Math.random().toString(36).slice(2, 14)}`,
    type,
    status: input.status || 'active',
    scopes: input.scopes || (type === 'delivery' ? ['content:read', 'media:read'] : ['models:write', 'entries:write', 'media:write']),
    lastUsedAt: input.lastUsedAt || null,
    expiresAt: input.expiresAt || null,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
  }

  store.tokens.unshift(token)
  touchProject(projectId)
  return clone(token)
}

export function updateApiToken(id: string, input: Partial<ApiToken>, scope: RequestScope | string): ApiToken {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const current = getTokenOrThrow(id, projectId)
  const next: ApiToken = {
    ...clone(current),
    ...clone(input),
    id: current.id,
    projectId: current.projectId,
    token: current.token,
    updatedAt: nowIso(),
  }

  const index = store.tokens.findIndex(token => token.id === id)
  store.tokens.splice(index, 1, next)
  touchProject(projectId)
  return clone(next)
}

export function deleteApiToken(id: string, scope: RequestScope | string): ApiToken {
  const store = getStore()
  const projectId = getProjectIdFromScope(scope)
  const current = getTokenOrThrow(id, projectId)
  store.tokens = store.tokens.filter(token => token.id !== id)
  touchProject(projectId)
  return clone(current)
}

export function listDeliveryContent(modelApiId: string, scope?: RequestScope | string, query?: string): DeliveryContentItem[] {
  const projectId = typeof scope === 'string'
    ? scope
    : scope
      ? getScopedProjectId(scope.sessionId, scope.projectId)
      : undefined
  const matches = getStore().models
    .filter(item => item.apiId === modelApiId)
    .filter(item => !projectId || item.projectId === projectId)

  if (!matches.length) {
    throw createError({
      statusCode: 404,
      statusMessage: `Model apiId ${modelApiId} was not found.`,
    })
  }

  if (matches.length > 1 && !projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: `Project scope is required for model apiId ${modelApiId}.`,
    })
  }

  const model = matches[0]

  return sortByUpdatedAt(getStore().entries)
    .filter(entry => entry.projectId === model.projectId)
    .filter(entry => entry.modelId === model.id)
    .filter(entry => entry.status === 'published')
    .filter(entry => matchesSearch(`${entry.title} ${entry.slug}`, query))
    .map(entry => createDeliveryItem(entry))
}

export function getDeliveryContent(modelApiId: string, entryId: string, scope?: RequestScope | string): DeliveryContentItem {
  const item = listDeliveryContent(modelApiId, scope).find(entry => entry.id === entryId)
  if (!item) {
    throw createError({
      statusCode: 404,
      statusMessage: `Published entry ${entryId} was not found.`,
    })
  }

  return item
}

export function getScopedProject(sessionId?: string, requestedProjectId?: string | null): string {
  return getScopedProjectId(sessionId, requestedProjectId)
}

export function getDashboard(scope: RequestScope): DashboardSnapshot {
  const session = getAuthSession(scope)
  const projectId = getProjectIdFromScope(scope)
  const recentModels = listModels({}, projectId).slice(0, 5)
  const recentEntries = listEntries({}, projectId).slice(0, 5)
  const recentMedia = listMedia({}, projectId).slice(0, 5)
  const tokens = listApiTokens({}, projectId)
  const webhooks = listWebhooks(projectId)
  const project = session?.user
    ? buildProjectSnapshot(projectId, session.user.id, session.activeProjectId || null)
    : null

  return {
    project,
    counts: {
      models: recentModels.length ? getProjectCounts(projectId).modelCount : getProjectCounts(projectId).modelCount,
      entries: getProjectCounts(projectId).entryCount,
      media: getProjectCounts(projectId).mediaCount,
      tokens: tokens.length,
      webhooks: webhooks.length,
    },
    recentModels,
    recentEntries,
    recentMedia,
    pendingInvites: session?.pendingInvites || [],
  }
}
