import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('LoggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
    
  }

  const handleLogout = () => {
    window.localStorage.removeItem('LoggedInUser')
    setUser(null)
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
        <div>{errorMessage}</div>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='username'>Username </label>
            <input 
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password </label>
            <input 
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>Log In</button>
        </form>
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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App