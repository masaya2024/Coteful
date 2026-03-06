import { defineEventHandler, getQuery, getRouterParam } from 'h3'
import { getRequestScope } from '../../../_utils/request-context'
import { toListResponse } from '../../../../utils/api-response'
import { listDeliveryContent } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const modelApiId = getRouterParam(event, 'modelApiId') || ''
  const query = getQuery(event)
  const q = typeof query.q === 'string' ? query.q : undefined
  const scope = getRequestScope(event)

  return toListResponse(listDeliveryContent(modelApiId, scope, q), {
    modelApiId,
    q,
    projectId: scope.projectId,
  })
})
