import api from "./api"

export const post_oauth_login = async (accessToken: string) => {
  try {
    const result = await api.post("/v1/oauth/login", { accessToken })
    return result
  } catch (e) {
    console.error(e)
    throw new Error("로그인이 실패하였습니다. post /v1/oauth/login")
  }
}

export const get_oauth_logout = async () => {
  try {
    const result = await api.get("/v1/oauth/logout")
    return result
  } catch (e) {
    console.error(e)
    throw new Error("로그아웃이 실패하였습니다. post /v1/oauth/logout")
  }
}
