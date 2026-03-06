import { d as defineEventHandler, c as toItemResponse, W as listLoginOptions } from '../../../../nitro/nitro.mjs';
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

const options_get = defineEventHandler(() => {
  return toItemResponse(listLoginOptions());
});

export { options_get as default };
//# sourceMappingURL=options.get.mjs.map
