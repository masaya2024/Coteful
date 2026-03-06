import { defineEventHandler, getRouterParam } from 'h3'
import { getRequestScope } from '../../_utils/request-context'
import { toItemResponse } from '../../../utils/api-response'
import { getMediaById } from '../../../utils/content-store'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') || ''
  return toItemResponse(getMediaById(id, getRequestScope(event)))
})
