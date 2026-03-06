import { defineEventHandler } from 'h3'
import { getRequestScope } from '../../_utils/request-context'
import { toItemResponse } from '../../../utils/api-response'
import { getAuthSession } from '../../../utils/content-store'

export default defineEventHandler((event) => {
  return toItemResponse(getAuthSession(getRequestScope(event)))
})
