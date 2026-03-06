import { defineEventHandler, getRouterParam } from 'h3'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toItemResponse } from '../../../../utils/api-response'
import { getTokenById } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') || ''
  return toItemResponse(getTokenById(id, getRequestScope(event)))
})
