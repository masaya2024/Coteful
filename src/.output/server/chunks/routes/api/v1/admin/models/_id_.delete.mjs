import { d as defineEventHandler, a as getRouterParam, x as deleteModel, t as toMutationResponse } from '../../../../../nitro/nitro.mjs';
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

const _id__delete = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const item = deleteModel(id, getRequestScope(event));
  return toMutationResponse(item, "Content model deleted.");
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
