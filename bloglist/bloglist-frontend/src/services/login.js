import axios from 'axios'
const baseUrl = '/api/login'

const login = async (cred) => {
  const res = await axios.post(baseUrl, cred)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }