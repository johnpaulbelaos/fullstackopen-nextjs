"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"
import { useSession } from "next-auth/react"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "", success: false })
  const { showNotification } = useNotification()
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    } else {
      showNotification(state.error)
    }
  }, [state, showNotification, router])

  if (session === undefined) {
    return(
      <div>
        <p>
          Loading...
        </p>
      </div>
    )
  }

  if (!session) {
    return(
      <div>
        <p>
          You need to log-in before you can do that
        </p>
      </div>
    )
  }

  return (
    <div className="border rounded-l border-gray-300 max-w-2xl mx-auto my-16 p-6">
      <h2 className="text-2xl font-bold mb-2">Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title <br/>
          </label>
            <input type="text" name="title" required minLength={5} className="border rounded-sm mb-3 w-full p-1"/>
        </div>
        <div>
          <label>
            Author <br/>
          </label>
            <input type="text" name="author" required minLength={5} className="border rounded-sm mb-3 w-full p-1"/>
        </div>
        <div>
          <label>
            URL <br/>
          </label>
            <input type="text" name="url" required minLength={5} className="border rounded-sm mb-1 w-full p-1"/>
        </div>
        <button type="submit" className="border-hidden bg-blue-400 text-white hover:bg-blue-600 rounded mt-2 px-2">Create</button>
      </form>
    </div>
  )
}

export default NewBlog