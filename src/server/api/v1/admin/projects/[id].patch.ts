import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { updateProject } from '../../../../utils/content-store'

interface ProjectBody {
  name?: string
  slug?: string
  description?: string
  environment?: 'production' | 'staging' | 'preview'
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody<ProjectBody>(event)
  const item = updateProject(id, body, getRequestScope(event))

  return toMutationResponse(item, 'Project updated.')
})
