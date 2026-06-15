"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  const initialState = { errors: { error: "" }, values: { username: "", name: "", password: "", passwordConfirm: "" } }
  const [state, formAction] = useActionState(registerUser, initialState)

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
        {state.errors.error && <p style={{ color: "red" }}>{state.errors.error}</p>}
      </form>
    </div>
  )
}