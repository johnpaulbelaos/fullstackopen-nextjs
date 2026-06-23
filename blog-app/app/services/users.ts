import { eq, and } from "drizzle-orm"
import { db } from "@/db"
import { readingList, users } from "@/db/schema"
import { getCurrentUser } from "./session"

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

export const getReadingList = async (userId: number) => {
  const readBlogs = await db.query.readingList.findMany({
    where: and(eq(readingList.userId, userId), eq(readingList.read, true)),
    with: {
      reading: true
    }
  })

  const unreadBlogs = await db.query.readingList.findMany({
    where: and(eq(readingList.userId, userId), eq(readingList.read, false)),
    with: {
      reading: true
    }
  })

  return {readBlogs, unreadBlogs}
}

export const getReadingById = async (userId: number, blogId: number) => {
  return db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId))
  })
}

export const markAsRead = async (blogId: number) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }

  const reading = await getReadingById(user.id, blogId)

  if (reading) {
    await db
      .update(readingList)
      .set({ read: true })
      .where(and(eq(readingList.userId, user.id), eq(readingList.blogId, blogId)))
  }
}