import { d as defineEventHandler, c as toItemResponse, X as getAuthSession } from '../../../../nitro/nitro.mjs';
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

const session_get = defineEventHandler((event) => {
  return toItemResponse(getAuthSession(getRequestScope(event)));
});

export { session_get as default };
//# sourceMappingURL=session.get.mjs.map
