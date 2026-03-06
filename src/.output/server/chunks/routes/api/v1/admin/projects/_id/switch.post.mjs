import { d as defineEventHandler, a as getRouterParam, E as switchProject, s as setCookie, t as toMutationResponse } from '../../../../../../nitro/nitro.mjs';
import { getRequestScope } from '../../../../_utils/request-context.mjs';
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

const switch_post = defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  const item = switchProject(id, getRequestScope(event));
  if (item.activeProjectId) {
    setCookie(event, "conteful-project-id", item.activeProjectId, {
      sameSite: "lax",
      path: "/"
    });
  }
  return toMutationResponse(item, "Project switched.");
});

export { switch_post as default };
//# sourceMappingURL=switch.post.mjs.map
