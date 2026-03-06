import { defineEventHandler } from 'h3'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { getDashboard } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  return getDashboard(getRequestScope(event))
})
