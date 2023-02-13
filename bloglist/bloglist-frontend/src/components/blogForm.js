const blogForm = (newBlog, setNewBlog, addNewBlog) => <form onSubmit={addNewBlog}>
<div>
  <label htmlFor='title'>title:</label>
  <input 
    id='title'
    type='text'
    value={newBlog.title}
    name='Title'
    onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
  />
</div>
<div>
  <label htmlFor='author'>author:</label>
  <input 
    id='author'
    type='text'
    value={newBlog.author}
    name='Author'
    onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
  />
</div>
<div>
  <label htmlFor='url'>url:</label>
  <input 
    id='url'
    type='text'
    value={newBlog.url}
    name='URL'
    onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
  />
</div>
<button type='submit'>Create</button>
</form>

export default blogForm