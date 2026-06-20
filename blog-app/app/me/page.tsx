import { auth } from "@/auth"

import { generateUserToken } from "../actions/users"
import { getCurrentUser } from "../services/session"

const Me = async () => {
  const user = await getCurrentUser()

  if (user === undefined) {
    return(
      <div>
        <p>
          Loading...
        </p>
      </div>
    )
  }

  if (!user) {
    return(
      <div>
        <p>
          You need to log-in before you can do that
        </p>
      </div>
    )
  }

  const token = user.token || 'No token has been generated yet'

  return (
    <div className="border rounded-l border-gray-300 max-w-2xl mx-auto my-16 p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p>
        Name: {user.name} <br/>
        Username: {user.username}
      </p>
      <hr className="my-6"></hr>
      <h2 className="text-2xl font-bold mb-4">API Token</h2>
      <div className="bg-gray-100 mb-4 p-2">
        Current token:
        <p className="bg-gray-200 mt-1 p-1">
          {token}
        </p>
      </div>
      <form action={generateUserToken}>
        <input type="hidden" name="id" value={user.id} />
        <button type="submit" className="border-hidden bg-blue-400 text-white hover:bg-blue-600 rounded p-2">
          Generate New Token
        </button>
      </form>
    </div>
  )
}

export default Me