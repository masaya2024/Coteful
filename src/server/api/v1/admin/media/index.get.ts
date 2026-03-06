import { defineEventHandler, getQuery } from 'h3'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toListResponse } from '../../../../utils/api-response'
import { listMedia } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const q = typeof query.q === 'string' ? query.q : undefined
  const tag = typeof query.tag === 'string' ? query.tag : undefined
  const scope = getRequestScope(event)

  return toListResponse(listMedia({ q, tag }, scope), { q, tag, projectId: scope.projectId })
})
