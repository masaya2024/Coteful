import { defineEventHandler, readBody } from 'h3'
import type { ContentModel } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { createModel } from '../../../../utils/content-store'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ContentModel>>(event)
  const item = createModel(body, getRequestScope(event))

  return toMutationResponse(item, 'Content model created.')
})
