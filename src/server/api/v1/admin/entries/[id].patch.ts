import { defineEventHandler, getRouterParam, readBody } from 'h3'
import type { ContentEntry } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { updateEntry } from '../../../../utils/content-store'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody<Partial<ContentEntry>>(event)
  const item = updateEntry(id, body, getRequestScope(event))

  return toMutationResponse(item, 'Entry updated.')
})
