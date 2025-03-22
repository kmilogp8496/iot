declare module '#auth-utils' {
  interface User {
    id: number
    email: string
    name: string
    avatar: string | null
    organization: {
      id: number
      name: string
    }
  }

  interface UserSession {
    loggedInAt: number
    user: User
  }

  // interface SecureSessionData {
  //   id: string
  //   user: User
  // }
}

export {}
