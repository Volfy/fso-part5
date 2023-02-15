import { useState } from 'react'

const Blog = ({blog}) => {
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
      <div>{blog.title} by {blog.author}</div> 
      <div>{blog.url}</div> 
      <div>likes {blog.likes} <button>Like</button></div> 
      <div>{blog.user.username}</div>
      <button onClick={() => setFullView(!isFullView)}>Hide</button>
    </div>
  )

  return isFullView ? blogBig : blogSmall
}

export default Blog


/* const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}) */