import { defineEventHandler, getRouterParam, readBody } from 'h3'
import type { ContentModel } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { updateModel } from '../../../../utils/content-store'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody<Partial<ContentModel>>(event)
  const item = updateModel(id, body, getRequestScope(event))

  return toMutationResponse(item, 'Content model updated.')
})
