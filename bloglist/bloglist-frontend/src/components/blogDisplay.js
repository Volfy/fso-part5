import Blog from './Blog'

const blogDisplay = (blogs) => <div>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )}
</div>

export default blogDisplay