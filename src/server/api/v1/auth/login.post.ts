import { defineEventHandler, readBody, setCookie } from 'h3'
import { toMutationResponse } from '../../../utils/api-response'
import { login } from '../../../utils/content-store'

interface LoginBody {
  email: string
  password: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event)
  const session = login(body)

  setCookie(event, 'conteful-session-id', session.sessionId, {
    sameSite: 'lax',
    path: '/',
  })

  if (session.activeProjectId) {
    setCookie(event, 'conteful-project-id', session.activeProjectId, {
      sameSite: 'lax',
      path: '/',
    })
  }

  return toMutationResponse(session, 'Logged in.')
})
