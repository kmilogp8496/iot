declare module '#auth-utils' {
  interface User {
    // Add your own fields
    email: string
    name: string
    avatar: string | null
    organization: {
      id: number
      name: string
    }
  }

  interface UserSession {
    // Add your own fields
    loggedInAt: number
    user: User
  }

  // interface SecureSessionData {
  //   id: string
  //   user: User
  // }
}

export {}
