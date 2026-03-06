export default defineNuxtRouteMiddleware((to) => {
  const sessionId = useCookie<string | null>('conteful-session-id', {
    sameSite: 'lax',
  })

  const publicRoutes = new Set(['/login', '/contact', '/400', '/reload'])
  const isLoginRoute = to.path === '/login'
  const isPublicRoute = publicRoutes.has(to.path)
  const isAuthenticated = Boolean(sessionId.value)

  if (!isAuthenticated && !isPublicRoute) {
    return navigateTo('/login')
  }

  if (isAuthenticated && isLoginRoute) {
    return navigateTo('/')
  }
})
