import { d as defineEventHandler, r as readBody, T as login, s as setCookie, t as toMutationResponse } from '../../../../nitro/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = login(body);
  setCookie(event, "conteful-session-id", session.sessionId, {
    sameSite: "lax",
    path: "/"
  });
  if (session.activeProjectId) {
    setCookie(event, "conteful-project-id", session.activeProjectId, {
      sameSite: "lax",
      path: "/"
    });
  }
  return toMutationResponse(session, "Logged in.");
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
