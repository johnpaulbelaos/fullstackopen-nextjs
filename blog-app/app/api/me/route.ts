import { NextRequest, NextResponse } from "next/server"
import { tokenGetUserWithBlogs } from "../../services/users"

export const GET = async (req: NextRequest) => {
  const header = req.headers.get('authorization')

  if (header) {
    const token = header.replace('Bearer ', '')
    const user = await tokenGetUserWithBlogs(token)
    if (user) {
      const createdBlogs = user.blogs.map(blog => ({
        author: blog.author,
        title: blog.title,
        url: blog.url
      }))

      const userJson = {
        id: user.id,
        username: user.username,
        name: user.name,
        createdBlogs
      }

      return NextResponse.json(userJson)
    }
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}