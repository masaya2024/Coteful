import { defineEventHandler, getQuery } from 'h3'
import type { ApiTokenStatus, ApiTokenType } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toListResponse } from '../../../../utils/api-response'
import { listApiTokens } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const type = typeof query.type === 'string' ? (query.type as ApiTokenType) : undefined
  const status = typeof query.status === 'string' ? (query.status as ApiTokenStatus) : undefined
  const scope = getRequestScope(event)

  return toListResponse(listApiTokens({ type, status }, scope), {
    type,
    status,
    projectId: scope.projectId,
  })
})
