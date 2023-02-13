const loginForm = (username, setUsername, password, setPassword, handleLogin) => 
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

export default loginForm