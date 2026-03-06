import { d as defineEventHandler, a as getRouterParam, f as getQuery, Q as deliverWebhook, t as toMutationResponse } from '../../../../../../nitro/nitro.mjs';
import { getRequestScope } from '../../../../_utils/request-context.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const deliver_post = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const query = getQuery(event);
  const eventName = typeof query.event === "string" ? query.event : "entry.updated";
  const item = deliverWebhook(id, getRequestScope(event), eventName);
  return toMutationResponse(item, "Webhook delivery simulated.");
});

export { deliver_post as default };
//# sourceMappingURL=deliver.post.mjs.map
