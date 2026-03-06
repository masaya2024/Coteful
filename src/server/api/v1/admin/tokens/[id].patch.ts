import { defineEventHandler, getRouterParam, readBody } from 'h3'
import type { ApiToken } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { updateApiToken } from '../../../../utils/content-store'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody<Partial<ApiToken>>(event)
  const item = updateApiToken(id, body, getRequestScope(event))

  return toMutationResponse(item, 'API token updated.')
})
