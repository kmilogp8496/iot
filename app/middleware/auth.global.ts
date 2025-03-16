export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.requiresAuth === false) {
    return
  }

  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})
