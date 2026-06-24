import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-2 max-w-max">
        {users.map((user) => (
          <li key={user.id} className="border rounded p-3 hover:bg-gray-100">
            <Link href={`/users/${user.username}`} className="block text-blue-600">{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users