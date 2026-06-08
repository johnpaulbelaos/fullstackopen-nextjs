import { eq, ilike, sql } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

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
  await db.insert(blogs).values({ title, author, url, likes })
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