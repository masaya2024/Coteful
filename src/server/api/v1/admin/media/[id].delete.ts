import { defineEventHandler, getRouterParam } from 'h3'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { deleteMedia } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') || ''
  const item = deleteMedia(id, getRequestScope(event))

  return toMutationResponse(item, 'Media deleted.')
})
