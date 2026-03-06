import { getCookie, getHeader, getQuery, type H3Event } from 'h3'

export function getRequestSessionId(event: H3Event): string | undefined {
  const query = getQuery(event)
  const header = getHeader(event, 'x-conteful-session-id')
  const cookie = getCookie(event, 'conteful-session-id')
  const raw = header || cookie || (typeof query.sessionId === 'string' ? query.sessionId : undefined)
  return raw?.trim() || undefined
}

export function getRequestProjectId(event: H3Event): string | undefined {
  const query = getQuery(event)
  const header = getHeader(event, 'x-conteful-project-id')
  const cookie = getCookie(event, 'conteful-project-id')
  const raw = header || cookie || (typeof query.projectId === 'string' ? query.projectId : undefined)
  return raw?.trim() || undefined
}

export function getRequestScope(event: H3Event) {
  return {
    sessionId: getRequestSessionId(event),
    projectId: getRequestProjectId(event),
  }
}
