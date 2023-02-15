import { useState, useEffect, useRef } from 'react'
import blogDisplay from './components/blogDisplay'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notif from './components/Notif'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [notifColour, setNotifColour] = useState('')
  const [message, setMessage] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  
  // message helper function

  const messager = (msg, isError) => {
    setMessage(msg)
    setNotifColour(
    isError
    ? '#ff0000' 
    : '#00ff00'
    ) 
    setTimeout(() => setMessage(''), 5000)
  }

  // login stuff

  const handleLogin = async (credsObject) => {
    try {
      const user = await loginService.login(credsObject)
      window.localStorage.setItem('LoggedInUser', JSON.stringify(user))
      setUser(user)
      messager('', 0)
    } catch (e) {
      messager('Wrong Credentials', 1)
    }
  }

  //// login form auto hides, useRef unnecessary

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm handleLogin={handleLogin}/>
    </Togglable>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('LoggedInUser')
    setUser(null)
    messager('', 0)
  }

  // blog stuff

  const addNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.addNew(blogObject, user)
      setBlogs(blogs.concat({...blogObject, user: blog.user, likes: blog.likes, id: blog.id}))
      messager(`Blog ${blog.title} by ${blog.author} added`, 0)
    } catch (e) {
      messager('Unable to add new blog', 1)
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='add blog' ref={blogFormRef}>
      <BlogForm addNewBlog={addNewBlog} messager={messager}/>
    </Togglable>
  )

  // effects

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('LoggedInUser')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // returns

  if (user === null) {
    return (
      <div>
        <h2>Log in to Application</h2>
        {Notif(message, notifColour)}
        {loginForm()}
      </div>
    )
  }
  
  console.log(blogs)
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in  
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <h2>Create new blog</h2>
        {Notif(message, notifColour)}
        {blogForm()}
      </div>
      {blogDisplay(blogs)}
    </div>
  )
}

export default App