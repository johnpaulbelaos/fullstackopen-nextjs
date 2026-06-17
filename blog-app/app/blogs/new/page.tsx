"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "", success: false })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    } else {
      showNotification(state.error)
    }
  }, [state, showNotification, router])

  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" required minLength={5} />
          </label>
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" required minLength={5} />
          </label>
        </div>
        <div>
          <label>
            URL
            <input type="text" name="url" required minLength={5} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog