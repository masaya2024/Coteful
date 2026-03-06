import { d as defineEventHandler, r as readBody, S as createWebhook, t as toMutationResponse } from '../../../../nitro/nitro.mjs';
import { getRequestScope } from '../../_utils/request-context.mjs';
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

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const item = createWebhook(body, getRequestScope(event));
  return toMutationResponse(item, "Webhook created.");
});

export { index_post as default };
//# sourceMappingURL=index.post7.mjs.map
