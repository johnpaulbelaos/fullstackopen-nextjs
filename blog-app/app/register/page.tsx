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
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required defaultValue={state.values?.username} />
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required defaultValue={state.values?.name} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required defaultValue={state.values?.password} />
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" required defaultValue={state.values?.passwordConfirm} />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}