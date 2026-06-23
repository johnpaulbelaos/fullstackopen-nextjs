import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addBlogToReadingList, incrementBlogLike } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="border rounded-l border-gray-300 max-w-2xl mx-auto my-16 p-6">
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-2">
        {"by"} {blog.author}
      </p>
      <div  className="flex mx- auto mb-4">
        <form action={incrementBlogLike}>
          <input type="hidden" name="id" value={blog.id} />
          likes: {blog.likes} {" "}
          <button type="submit" className="border-hidden bg-blue-400 text-white hover:bg-blue-600 rounded ml-2 px-2">
            like
          </button>
        </form>
        <form action={addBlogToReadingList}>
          <input type="hidden" name="id" value={blog.id} />
          <button type="submit" className="border-hidden bg-green-400 text-white hover:bg-green-600 rounded ml-2 px-2">
            add to reading list
          </button>
        </form>
      </div>
      <p className="">
        {blog.url}
      </p>
    </div>
  )
}

export default BlogPage