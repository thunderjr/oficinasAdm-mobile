import useServerData from './../hooks/useServerData'
import axios from 'axios'

const api = axios.create({
    baseURL: `localhost`
})

api.interceptors.request.use(
    async config => {
        const { ip, port } = await useServerData()
        config.baseURL = `http://${ip}:${port}/`
        return config
    },
    error => Promise.reject(error)
)

export default api