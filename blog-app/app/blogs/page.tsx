import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { searchFilter } from "../actions/blogs"

const Blogs = async ({ searchParams }: { searchParams: Promise<{filter?: string}> }) => {
  const { filter } = await searchParams

  const blogs = await getBlogs(filter || '')

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form action={searchFilter}>
        <div>
          <input type="text" name="filter" className="border rounded-sm p-1" />
        </div>
        <button type="submit" className="border rounded-sm p-0.5 bg-blue-100 hover:bg-blue-200">Search</button>
      </form>
      <br/>
      <ul className="space-y-2">
        {blogs.map((blog) => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-100 text-center">
            <Link href={`/blogs/${blog.id}`} className="bl  ock text-blue-600">
              {blog.title} {"by"} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs