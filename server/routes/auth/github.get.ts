import type { H3Event } from 'h3'

interface GitHubUser {
  email: string
  name: string
  avatar_url: string
  email_verified: boolean
}

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event: H3Event, { user }: { user: GitHubUser }) {
    const db = useDrizzle()

    let dbUser = (await db.select({
      id: tables.users.id,
      email: tables.users.email,
      organizationId: tables.users.organizationId,
      organizationName: tables.organizations.name,
      name: tables.users.name,
      avatar: tables.users.avatar,
    })
      .from(tables.users)
      .where(
        eq(tables.users.email, user.email),
      ).innerJoin(
        tables.organizations, eq(tables.users.organizationId, tables.organizations.id),
      )
    ).at(0)

    if (!dbUser) {
      const organization = await (db.insert(tables.organizations).values({
        name: user.email,
      }).returning())

      const createdUser = (await db.insert(tables.users).values({
        email: user.email,
        name: user.name,
        avatar: user.avatar_url,
        organizationId: organization.at(0)!.id,
      }).returning()).at(0)!

      dbUser = {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        avatar: createdUser.avatar,
        organizationId: createdUser.organizationId,
        organizationName: organization.at(0)!.name,
      }
    }

    await setUserSession(event, {
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        avatar: dbUser.avatar,
        organization: {
          id: dbUser.organizationId,
          name: dbUser.organizationName,
        },
      },
      loggedInAt: Date.now(),
    })
    return sendRedirect(event, '/')
  },
  onError(event: H3Event, error: Error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
