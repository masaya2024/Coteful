import { d as defineEventHandler, f as getQuery, h as toListResponse, m as listInvites } from '../../../../nitro/nitro.mjs';
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
  const status = typeof query.status === "string" ? query.status : void 0;
  const email = typeof query.email === "string" ? query.email : void 0;
  const projectId = typeof query.projectId === "string" ? query.projectId : void 0;
  const scope = getRequestScope(event);
  return toListResponse(listInvites({ status, email, projectId }, scope), {
    status,
    email,
    projectId: projectId || scope.projectId
  });
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
