import { defineEventHandler, getQuery } from 'h3'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toListResponse } from '../../../../utils/api-response'
import { listProjects } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const q = typeof query.q === 'string' ? query.q : undefined
  return toListResponse(listProjects({ q }, getRequestScope(event)), { q })
})
