import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import loginForm from './components/loginForm'
import blogDisplay from './components/blogDisplay'
import blogForm from './components/blogForm'
import Notif from './components/Notif'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [notifCol, setNotifCol] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

  const messager = (msg, isError) => {
    setMessage(msg)
    setNotifCol(
    isError
    ? '#ff0000' 
    : '#00ff00'
    ) 
    setTimeout(() => setMessage(''), 5000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('LoggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      messager('Wrong Credentials', 1)
    }
    
  }

  const handleLogout = () => {
    window.localStorage.removeItem('LoggedInUser')
    setUser(null)
    setUsername('')
    setPassword('')
    setMessage('')
  }

  const addNewBlog = async (e) => {
    e.preventDefault()
    if (newBlog.title && newBlog.url && newBlog.author) {
      try {
        const blog = await blogService.addNew(newBlog, user)
        setBlogs(blogs.concat({...newBlog, user: blog.user, likes: blog.likes, id: blog.id}))
        setNewBlog({title: '', author: '', url: ''})
        messager(`Blog ${blog.title} by ${blog.author} added`, 0)
        return
      } catch (e) {
        messager('Unable to add new blog', 1)
        return
      }
    }
    messager('Missing fields', 1)
  }

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

  if (user === null) {
    return (
      <div>
        <h2>Log in to Application</h2>
        {Notif(message, notifCol)}
        {loginForm(username, setUsername, password, setPassword, handleLogin)}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in  
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <h2>Create new blog</h2>
        {Notif(message, notifCol)}
        {blogForm(newBlog, setNewBlog, addNewBlog)}
      </div>
      {blogDisplay(blogs)}
    </div>
  )
}

export default App