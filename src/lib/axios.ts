import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.defaults.headers.common = {'Authorization': `Bearer ${cookies.get('token')}`}

export { api } 