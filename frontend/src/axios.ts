import Axios from "axios"
import router from "./router"

export type BackendIssue = {
  code: string
  path: Array<string | number>
  message: string
}

const axios = Axios.create({
  baseURL: "http://localhost:3100",
  withCredentials: true,
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      router.navigate({ to: "/sign_in", search: { from: window.location.pathname } })
    }
    return Promise.reject(error)
  },
)

export default axios
