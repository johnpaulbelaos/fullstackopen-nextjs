const blogs = [
  {
    id: 1,
    title: "First Blog",
    author: "Jane Blog",
    url: "blog.com",
    likes: 0
  }
]

let nextId = 2

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string, likes: number) => {
  blogs.push({ id: nextId++, title, author, url, likes })
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const incrementLike = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) {
    blog.likes += 1
  }
}