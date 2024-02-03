import api from "./api"
import { Profile } from "../types/account"

export const get_user_myProfile = async () => {
  return await api.get<Profile>("/v1/user/myProfile")
}
