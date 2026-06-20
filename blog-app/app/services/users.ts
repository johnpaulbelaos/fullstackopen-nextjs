import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const getUsers = async () => {
  return db.select().from(users)
}

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}

export const tokenGetUserWithBlogs = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
  })
}

export const generateToken = async (id: number) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  })

  const token = crypto.randomUUID()

  if (user) {
    await db
      .update(users)
      .set({ token })
      .where(eq(users.id, id))
  }
}