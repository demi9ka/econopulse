import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:5200',
    baseURL: 'https://finstream-server.vercel.app',
})

export default api
