import { f as getQuery, M as getHeader, N as getCookie } from '../../../nitro/nitro.mjs';
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

function getRequestSessionId(event) {
  const query = getQuery(event);
  const header = getHeader(event, "x-conteful-session-id");
  const cookie = getCookie(event, "conteful-session-id");
  const raw = header || cookie || (typeof query.sessionId === "string" ? query.sessionId : void 0);
  return (raw == null ? void 0 : raw.trim()) || void 0;
}
function getRequestProjectId(event) {
  const query = getQuery(event);
  const header = getHeader(event, "x-conteful-project-id");
  const cookie = getCookie(event, "conteful-project-id");
  const raw = header || cookie || (typeof query.projectId === "string" ? query.projectId : void 0);
  return (raw == null ? void 0 : raw.trim()) || void 0;
}
function getRequestScope(event) {
  return {
    sessionId: getRequestSessionId(event),
    projectId: getRequestProjectId(event)
  };
}

export { getRequestProjectId, getRequestScope, getRequestSessionId };
//# sourceMappingURL=request-context.mjs.map
