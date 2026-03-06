import { defineEventHandler, getRouterParam, readBody } from 'h3'
import type { MediaItem } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { updateMedia } from '../../../../utils/content-store'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody<Partial<MediaItem>>(event)
  const item = updateMedia(id, body, getRequestScope(event))

  return toMutationResponse(item, 'Media updated.')
})
