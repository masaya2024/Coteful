import { d as defineEventHandler, a as getRouterParam, c as toItemResponse, Y as getDeliveryContent } from '../../../../../nitro/nitro.mjs';
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

const _entryId__get = defineEventHandler((event) => {
  const modelApiId = getRouterParam(event, "modelApiId") || "";
  const entryId = getRouterParam(event, "entryId") || "";
  const scope = getRequestScope(event);
  return toItemResponse(getDeliveryContent(modelApiId, entryId, scope), {
    modelApiId,
    entryId,
    projectId: scope.projectId
  });
});

export { _entryId__get as default };
//# sourceMappingURL=_entryId_.get.mjs.map
