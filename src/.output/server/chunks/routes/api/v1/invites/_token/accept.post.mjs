import { d as defineEventHandler, a as getRouterParam, k as acceptInvite, s as setCookie, t as toMutationResponse } from '../../../../../nitro/nitro.mjs';
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

const accept_post = defineEventHandler((event) => {
  const token = getRouterParam(event, "token") || "";
  const item = acceptInvite(token, getRequestScope(event));
  if (item.activeProjectId) {
    setCookie(event, "conteful-project-id", item.activeProjectId, {
      sameSite: "lax",
      path: "/"
    });
  }
  return toMutationResponse(item, "Invite accepted.");
});

export { accept_post as default };
//# sourceMappingURL=accept.post.mjs.map
