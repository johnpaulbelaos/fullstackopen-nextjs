"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      showNotification("Invalid username or password", 'error')
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="border rounded-l border-gray-300 max-w-2xl mx-auto my-16 p-6">
      <h2 className="text-2xl font-bold mb-2">Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input type="text" name="username" required className="border rounded-sm mb-3 w-full p-1"/>
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required className="border rounded-sm mb-3 w-full p-1"/>
          </label>
        </div>
        <button type="submit" className="border-hidden bg-blue-400 text-white hover:bg-blue-600 rounded mt-2 px-2">Login</button>
      </form>
    </div>
  )
}