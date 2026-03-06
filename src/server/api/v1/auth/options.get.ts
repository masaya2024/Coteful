import { defineEventHandler } from 'h3'
import { toItemResponse } from '../../../utils/api-response'
import { listLoginOptions } from '../../../utils/content-store'

export default defineEventHandler(() => {
  return toItemResponse(listLoginOptions())
})
