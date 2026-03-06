import { defineEventHandler, readBody } from 'h3'
import type { WebhookEvent, WebhookStatus } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { createWebhook } from '../../../../utils/content-store'

interface WebhookBody {
  name: string
  url: string
  status?: WebhookStatus
  events?: WebhookEvent[]
  secret?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<WebhookBody>(event)
  const item = createWebhook(body, getRequestScope(event))

  return toMutationResponse(item, 'Webhook created.')
})
