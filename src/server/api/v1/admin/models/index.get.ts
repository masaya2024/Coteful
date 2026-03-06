import { defineEventHandler, getQuery } from 'h3'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toListResponse } from '../../../../utils/api-response'
import { listModels } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const q = typeof query.q === 'string' ? query.q : undefined
  const scope = getRequestScope(event)

  return toListResponse(listModels({ q }, scope), { q, projectId: scope.projectId })
})
