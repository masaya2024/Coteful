import { defineEventHandler, readBody } from 'h3'
import type { MediaItem } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { createMedia } from '../../../../utils/content-store'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<MediaItem>>(event)
  const item = createMedia(body, getRequestScope(event))

  return toMutationResponse(item, 'Media created.')
})
