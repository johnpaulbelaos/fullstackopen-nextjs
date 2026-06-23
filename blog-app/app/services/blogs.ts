import { eq, ilike, sql, and } from "drizzle-orm"
import { db } from "@/db"
import { blogs, readingList } from "@/db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = async (filter: string) => {
  if (filter) {
    return db.query.blogs.findMany({
      orderBy: (b) => sql`${b.likes} desc`,
      where: ilike(blogs.title, `%${filter}%`),
    })
  }

  return db.query.blogs.findMany({
    orderBy: (b) => sql`${b.likes} desc`
  })
}

export const addBlog = async (title: string, author: string, url: string, likes: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  if (user) {
    const blog = await db.insert(blogs).values({ title, author, url, likes, userId: user.id })
      .returning({ blogId: blogs.id })
    await db.insert(readingList).values({ userId: user.id, blogId: blog[0].blogId })
  }
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const incrementLike = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }
}

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  if (user) {
    const userId = user.id
    await db.insert(readingList).values({ userId, blogId })
  }
}