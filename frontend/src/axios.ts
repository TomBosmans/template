import Axios from "axios"
import config from "#config"
import router from "./router"

export type BackendIssue = {
  code: string
  path: Array<string | number>
  message: string
}

const axios = Axios.create({
  baseURL: config.backend.url,
  withCredentials: true,
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      router.navigate({ to: "/sign_in", search: { from: window.location.pathname } })
    }

    if (error.response?.status === 400) {
      return Promise.reject(error)
    }

    throw Promise.reject(error)
  },
)

export default axios
