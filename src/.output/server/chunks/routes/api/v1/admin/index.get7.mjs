import { d as defineEventHandler, f as getQuery, h as toListResponse, K as listApiTokens } from '../../../../nitro/nitro.mjs';
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

const index_get = defineEventHandler((event) => {
  const query = getQuery(event);
  const type = typeof query.type === "string" ? query.type : void 0;
  const status = typeof query.status === "string" ? query.status : void 0;
  const scope = getRequestScope(event);
  return toListResponse(listApiTokens({ type, status }, scope), {
    type,
    status,
    projectId: scope.projectId
  });
});

export { index_get as default };
//# sourceMappingURL=index.get7.mjs.map
