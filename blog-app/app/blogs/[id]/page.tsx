import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { incrementBlogLike } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        {"by"} {blog.author} <br/>
        {blog.url}
      </p>
      <form action={incrementBlogLike}>
        <input type="hidden" name="id" value={blog.id} />
        {blog.likes} {" "}
        <button type="submit">
          {"like"}
        </button>
      </form>
    </div>
  )
}

export default BlogPage