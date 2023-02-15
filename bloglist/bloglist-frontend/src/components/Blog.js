import { useState } from 'react'

const Blog = ({blog, updateLikes, user, deleteBlog}) => {
  const [isFullView, setFullView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogSmall = (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={() => setFullView(!isFullView)}>View</button>
    </div>
  )

  const blogBig = (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setFullView(!isFullView)}>Hide</button>
      </div> 
      <div>{blog.url}</div> 
      <div>likes {blog.likes} 
        <button onClick={() => updateLikes(blog)}>Like</button>
      </div> 
      <div>{blog.user.username}</div>
      {blog.user.id === user.id &&
        <button onClick={
          () => {
            if (window.confirm(
              `Do you want to delete ${blog.title} by ${blog.author}?`
            )) {
              deleteBlog(blog, user)
            }
          }}
        >Remove</button>
      } 
    </div>
  )

  return isFullView ? blogBig : blogSmall
}

export default Blog