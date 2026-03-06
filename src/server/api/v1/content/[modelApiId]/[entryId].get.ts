import { defineEventHandler, getRouterParam } from 'h3'
import { getRequestScope } from '../../../_utils/request-context'
import { toItemResponse } from '../../../../utils/api-response'
import { getDeliveryContent } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const modelApiId = getRouterParam(event, 'modelApiId') || ''
  const entryId = getRouterParam(event, 'entryId') || ''
  const scope = getRequestScope(event)

  return toItemResponse(getDeliveryContent(modelApiId, entryId, scope), {
    modelApiId,
    entryId,
    projectId: scope.projectId,
  })
})
