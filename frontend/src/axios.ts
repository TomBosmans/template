import Axios from "axios"

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
    return Promise.reject(error)
  },
)

export default axios
