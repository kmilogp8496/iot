// auth.d.ts
declare module '#auth-utils' {
  interface User {
    // Add your own fields
    email: string
    name: string
    avatar: string | null
  }

  interface UserSession {
    // Add your own fields
    loggedInAt: number
    user: User
  }

//   interface SecureSessionData {
//     // Add your own fields
//   }
}

export {}
