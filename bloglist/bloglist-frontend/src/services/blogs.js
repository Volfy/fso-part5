import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNew = async (blogObject, user) => {
  const res = await axios.post(baseUrl, blogObject, { headers:
    {'Authorization': `Bearer ${user.token}`}
  })
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addNew }