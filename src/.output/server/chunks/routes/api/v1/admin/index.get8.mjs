import { d as defineEventHandler, h as toListResponse, R as listWebhooks } from '../../../../nitro/nitro.mjs';
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
  return toListResponse(listWebhooks(getRequestScope(event)));
});

export { index_get as default };
//# sourceMappingURL=index.get8.mjs.map
