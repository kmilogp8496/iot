export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.requiresAuth === false) {
    return
  }

  if (to.path === '/') {
    return
  }

  if (to.path.startsWith('/docs')) {
    return
  }

  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo({
      name: 'login',
    })
  }
})
