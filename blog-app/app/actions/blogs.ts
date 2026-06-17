"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, incrementLike } from "../services/blogs"
import { auth } from "@/auth"

export const createBlog = async (
  prevState: {error: string},
  formData: FormData
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  if (!title || title.length < 5) {
    return { error: "Blog title must be at least 5 characters long", success: false }
  }
  const author = formData.get("author") as string
  if (!author || author.length < 5) {
    return { error: "Blog author must be at least 5 characters long", success: false }
  }
  const url = formData.get("url") as string
  if (!url || url.length < 5) {
    return { error: "URL must be at least 5 characters long", success: false }
  }
  await addBlog(title, author, url, 0)

  revalidatePath("/blogs")
  return { error: "", success: true }
}

export const incrementBlogLike = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await incrementLike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const searchFilter = async (formData: FormData) => {
  const filter = formData.get("filter") as string
  redirect(`/blogs?filter=${filter}`)
}