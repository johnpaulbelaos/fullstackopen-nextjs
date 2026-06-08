import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { searchFilter } from "../actions/blogs"

const Blogs = async ({ searchParams }: { searchParams: Promise<{filter?: string}> }) => {
  const { filter } = await searchParams

  const blogs = await getBlogs(filter || '')

  return (
    <div>
      <h2>Blogs</h2>
      <form action={searchFilter}>
        <div>
          <input type="text" name="filter" />
        </div>
        <button type="submit">Search</button>
      </form>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title} {"by"} {blog.author} {"from"} {blog.url} {"with"} {blog.likes} {"likes"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs