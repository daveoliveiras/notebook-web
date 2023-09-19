import axios from 'axios'

export const ax = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})