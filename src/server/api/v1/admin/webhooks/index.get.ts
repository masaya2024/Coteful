import { defineEventHandler } from 'h3'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toListResponse } from '../../../../utils/api-response'
import { listWebhooks } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  return toListResponse(listWebhooks(getRequestScope(event)))
})
