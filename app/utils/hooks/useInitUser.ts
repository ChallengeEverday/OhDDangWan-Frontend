import { useAsync } from "react-use"
import { get_user_myProfile } from "../service/account"
import { useUserInfoStore } from "../store/userInfoStore"

export const useInitUser = () => {
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo)
  const removeUserInfo = useUserInfoStore((state) => state.removeUserInfo)

  useAsync(async () => {
    try {
      const { data } = await get_user_myProfile()
      if (data) {
        setUserInfo(data)
        return
      }
      removeUserInfo()
    } catch (e) {
      removeUserInfo()
    }
  }, [])
}
