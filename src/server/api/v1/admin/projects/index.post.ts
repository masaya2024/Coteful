import { defineEventHandler, readBody } from 'h3'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { createProject } from '../../../../utils/content-store'

interface ProjectBody {
  name: string
  slug?: string
  description?: string
  environment?: 'production' | 'staging' | 'preview'
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ProjectBody>(event)
  const item = createProject(body, getRequestScope(event))

  return toMutationResponse(item, 'Project created.')
})
