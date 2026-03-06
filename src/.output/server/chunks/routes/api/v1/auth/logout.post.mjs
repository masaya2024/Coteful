import { d as defineEventHandler, U as logout, V as deleteCookie, t as toMutationResponse } from '../../../../nitro/nitro.mjs';
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

const logout_post = defineEventHandler((event) => {
  const item = logout(getRequestScope(event));
  deleteCookie(event, "conteful-session-id", { path: "/" });
  deleteCookie(event, "conteful-project-id", { path: "/" });
  return toMutationResponse(item, "Logged out.");
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
