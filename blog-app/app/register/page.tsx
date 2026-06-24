"use client"

import { useActionState, useEffect } from "react"
import { registerUser } from "../actions/users"
import { useRouter } from "next/navigation"
import { useNotification } from "../components/NotificationContext"

export default function RegisterPage() {
  const initialState = { errors: { error: "" }, values: { username: "", name: "", password: "", passwordConfirm: "" }, success: false }
  const [state, formAction] = useActionState(registerUser, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("account created")
      router.push("/login")
    } else {
      showNotification(state.errors.error, 'error')
    }
  }, [state, showNotification, router])

  return (
    <div className="border rounded-l border-gray-300 max-w-2xl mx-auto my-16 p-6">
      <h2 className="text-2xl font-bold mb-2">Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required defaultValue={state.values?.username} className="border rounded-sm mb-3 w-full p-1"/>
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required defaultValue={state.values?.name} className="border rounded-sm mb-3 w-full p-1"/>
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required defaultValue={state.values?.password} className="border rounded-sm mb-3 w-full p-1"/>
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" required defaultValue={state.values?.passwordConfirm} className="border rounded-sm mb-3 w-full p-1"/>
          </label>
        </div>
        <button type="submit" className="border-hidden bg-blue-400 text-white hover:bg-blue-600 rounded mt-2 px-2">Register</button>
      </form>
    </div>
  )
}