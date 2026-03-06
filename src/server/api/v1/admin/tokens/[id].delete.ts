import { defineEventHandler, getRouterParam } from 'h3'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { deleteApiToken } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') || ''
  const item = deleteApiToken(id, getRequestScope(event))

  return toMutationResponse(item, 'API token deleted.')
})
