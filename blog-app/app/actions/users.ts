"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const registerUser = async (
  prevState: { errors: { error: string }, values: { username: string, name: string, password: string, passwordConfirm: string }},
  formData: FormData
) => {
  const errors = { error: "" }
  
  const username = (formData.get("username") as string)?.trim()
  if (!username || username.length < 4) {
    errors.error = "Username must be at least 4 characters long"
  }
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  })
  if (user) {
    errors.error = "Username already exists"
  }

  const name = (formData.get("name") as string)?.trim()

  const password = formData.get("password") as string
  if (!password|| password.length < 4) {
    errors.error = "Password must be at least 4 characters long"
  }

  const passwordConfirm = formData.get("passwordConfirm") as string
  if (password !== passwordConfirm ) {
    errors.error = "Password does not match, confirm password again"
  }

  if (errors.error) {
    return { errors, values: { username, name, password, passwordConfirm } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}