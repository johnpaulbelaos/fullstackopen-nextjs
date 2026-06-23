import { auth } from "@/auth"

import Link from "next/link"
import { generateUserToken, markBlogAsRead } from "../actions/users"
import { getCurrentUser } from "../services/session"
import { getReadingList } from "../services/users"

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
  const readingList = await getReadingList(user.id)

  return (
    <div className="border rounded-l border-gray-300 max-w-2xl mx-auto my-16 p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p>
        Name: {user.name} <br/>
        Username: {user.username}
      </p>
      <hr className="my-6"></hr>
      <h2 className="text-2xl font-bold mb-4">Reading List</h2>
      <h3 className="text-xl text-gray-600 font-bold mb-2">Unread {'('}{readingList.unreadBlogs.length}{')'}</h3>
      <ul className="space-y-2">
        {readingList.unreadBlogs.map((blog) => (
          <li key={blog.reading.id} className="flex items-center gap-6 bg-amber-50 mb-2 p-2">
            <Link href={`/blogs/${blog.reading.id}`} className="text-blue-700 hover:underline">
              {blog.reading.title}
            </Link>
            <form action={markBlogAsRead} className="flex items-center ml-auto">
              <input type="hidden" name="id" value={blog.reading.id} />
              <button type="submit" className="text-nowrap bg-green-400 text-white text-sm hover:bg-green-600 rounded py-1 px-2">
                mark as read
              </button>
            </form>
          </li>
        ))}
      </ul>
      <h3 className="text-xl text-gray-600 font-bold mb-2">Read {'('}{readingList.readBlogs.length}{')'}</h3>
        <ul className="space-y-2">
          {readingList.readBlogs.map((blog) => (
            <li key={blog.reading.id} className="bg-blue-50 mb-4 p-2">
              <Link href={`/blogs/${blog.reading.id}`} className="text-blue-700 hover:underline">
                {blog.reading.title}
              </Link>
            </li>
          ))}
        </ul>
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