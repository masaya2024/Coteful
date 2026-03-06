import { d as defineEventHandler, a as getRouterParam, c as toItemResponse, p as getMediaById } from '../../../../../nitro/nitro.mjs';
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

const _id__get = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  return toItemResponse(getMediaById(id, getRequestScope(event)));
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
