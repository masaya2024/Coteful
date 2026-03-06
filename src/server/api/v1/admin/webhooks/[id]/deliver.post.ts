import { defineEventHandler, getQuery, getRouterParam } from 'h3'
import type { WebhookEvent } from '../../../../../../types'
import { getRequestScope } from '../../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../../utils/api-response'
import { deliverWebhook } from '../../../../../utils/content-store'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') || ''
  const query = getQuery(event)
  const eventName = typeof query.event === 'string' ? (query.event as WebhookEvent) : 'entry.updated'
  const item = deliverWebhook(id, getRequestScope(event), eventName)

  return toMutationResponse(item, 'Webhook delivery simulated.')
})
