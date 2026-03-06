import { d as defineEventHandler, a as getRouterParam, r as readBody, u as updateEntry, t as toMutationResponse } from '../../../../../nitro/nitro.mjs';
import { getRequestScope } from '../../../_utils/request-context.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") || "";
  const body = await readBody(event);
  const item = updateEntry(id, body, getRequestScope(event));
  return toMutationResponse(item, "Entry updated.");
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
