import { useAsync } from "react-use"
import { get_user_myProfile } from "../service/account"
import { useUserInfoStore } from "../store/userInfoStore"

export const useInitUser = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo)
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo)
  const removeUserInfo = useUserInfoStore((state) => state.removeUserInfo)

  useAsync(async () => {
    const { data } = await get_user_myProfile()
    if (!userInfo && data) {
      setUserInfo(data)
    } else if (userInfo && !data) removeUserInfo()
    if (userInfo && !data) removeUserInfo()
  }, [])
}
