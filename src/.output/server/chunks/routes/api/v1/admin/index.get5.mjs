import { d as defineEventHandler, f as getQuery, h as toListResponse, A as listModels } from '../../../../nitro/nitro.mjs';
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
  const q = typeof query.q === "string" ? query.q : void 0;
  const scope = getRequestScope(event);
  return toListResponse(listModels({ q }, scope), { q, projectId: scope.projectId });
});

export { index_get as default };
//# sourceMappingURL=index.get5.mjs.map
