import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="border rounded-l border-gray-300 max-w-2xl mx-auto my-16 p-6">
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="mb-2">Username: {user.username}</p>
      <h3 className="text-xl font-bold mb-2">Blogs:</h3>
      <ul className="space-y-2">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-100 text-center">
            <Link href={`/blogs/${blog.id}`} className="bl  ock text-blue-600">
              {blog.title} {"by"} {blog.author} {"from"} {blog.url} {"with"} {blog.likes} {"likes"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage