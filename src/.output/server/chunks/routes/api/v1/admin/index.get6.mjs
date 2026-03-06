import { d as defineEventHandler, f as getQuery, h as toListResponse, F as listProjects } from '../../../../nitro/nitro.mjs';
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
  return toListResponse(listProjects({ q }, getRequestScope(event)), { q });
});

export { index_get as default };
//# sourceMappingURL=index.get6.mjs.map
