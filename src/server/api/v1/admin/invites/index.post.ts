import { defineEventHandler, readBody } from 'h3'
import type { ProjectRole } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { createInvite } from '../../../../utils/content-store'

interface InviteBody {
  email: string
  role?: ProjectRole
  projectId?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<InviteBody>(event)
  const item = createInvite(body, getRequestScope(event))

  return toMutationResponse(item, 'Invite created.')
})
