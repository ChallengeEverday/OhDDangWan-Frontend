import {
  GET_ChallengeMainResponseDto,
  POST_ChallengeForm,
} from "../types/challenge"
import api from "./api"

export const get_challenges = async (id: string) => {}

export const get_challenge_$challengeId = async (id: string) => {
  try {
    // const result: any = await fetch(
    //   `${process.env.NEXT_PUBLIC_API}/v1/challenges/${id}`,
    //   {
    //     // 1시간마다 캐시를 업데이트합니다.
    //     next: { revalidate: 60 * 60 },
    //     credentials: "include",
    //   },
    // )
    const result = await api.get<GET_ChallengeMainResponseDto>(
      `/v1/challenges/${id}`,
    )
    console.log(
      "url",
      `${process.env.NEXT_PUBLIC_API}/v1/challenges/${id}`,
      result.data,
    )
    return result.data
  } catch (e) {
    console.error(e)
    throw new Error(
      `챌린지를 불러오는데 실패하였습니다. get /v1/challenges/${id}`,
    )
  }
}

export const post_challenges = async (challengeForm: POST_ChallengeForm) => {
  try {
    const result = await api.post<number>("/v1/challenges", challengeForm)
    return result
  } catch (e) {
    console.error(e)
    throw new Error("챌린지를 생성하는데 실패하였습니다. post /v1/challenges")
  }
}
