import { defineEventHandler, readBody } from 'h3'
import type { ContentEntry } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { createEntry } from '../../../../utils/content-store'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ContentEntry>>(event)
  const item = createEntry(body, getRequestScope(event))

  return toMutationResponse(item, 'Entry created.')
})
