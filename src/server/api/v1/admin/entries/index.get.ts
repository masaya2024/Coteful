import { defineEventHandler, getQuery } from 'h3'
import type { ContentEntryStatus } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toListResponse } from '../../../../utils/api-response'
import { listEntries } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const q = typeof query.q === 'string' ? query.q : undefined
  const modelId = typeof query.modelId === 'string' ? query.modelId : undefined
  const status = typeof query.status === 'string' ? (query.status as ContentEntryStatus) : undefined
  const scope = getRequestScope(event)

  return toListResponse(listEntries({ q, modelId, status }, scope), {
    q,
    modelId,
    status,
    projectId: scope.projectId,
  })
})
