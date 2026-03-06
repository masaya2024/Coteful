import { defineEventHandler, readBody } from 'h3'
import type { ApiToken } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { createApiToken } from '../../../../utils/content-store'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ApiToken>>(event)
  const item = createApiToken(body, getRequestScope(event))

  return toMutationResponse(item, 'API token created.')
})
