import axios from "axios"
import { useUserInfoStore } from "../store/userInfoStore"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // if (error.response.status === 403) {
    //   window.location.href = "/login"
    //   useUserInfoStore.getState().removeUserInfo()
    // }
    // return Promise.reject(error)
  },
)

export default api
