import {
  ChallengeCategory,
  ChallengeMainResponseDto,
  GET_ChallengeMainResponseDto,
  GET_params_category_challenges,
  GET_params_challenges,
  POST_ChallengeForm,
  Pagenation,
} from "../types/challenge"
import api from "./api"

export const get_challenges = async (params?: GET_params_challenges) => {
  const paramsDefault = {
    page: 0,
    size: 12,
    sort: "desc",
    sortKey: "created_at",
    ...params,
  }

  const queryString = new URLSearchParams(paramsDefault as any).toString()

  try {
    const result = await api.get<Pagenation<ChallengeMainResponseDto[]>>(
      `/v1/challenges?${queryString}`,
    )

    return result
  } catch (e) {
    console.error(e)
    throw new Error(
      `챌린지를 불러오는데 실패하였습니다. get /v1/challenges?${queryString}}`,
    )
  }
}

export const get_challenges_category_$category = async (
  category: ChallengeCategory,
  params?: GET_params_category_challenges,
) => {
  const paramsDefault = {
    page: 0,
    size: 12,
    sort: "desc",
    sortKey: "created_at",
    ...params,
  }
  const queryString = new URLSearchParams(paramsDefault as any).toString()

  try {
    const result = await api.get<Pagenation<ChallengeMainResponseDto[]>>(
      `/v1/challenges/category/${category}?${queryString}`,
    )
    return result
  } catch (e) {
    console.error(e)
    throw new Error(
      `챌린지를 불러오는데 실패하였습니다. get /v1/challenges/category/${category}?${queryString}`,
    )
  }
}

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

export const get_challenges_$challengeId_likes = async (id: string) => {
  try {
    const result = await api.get<boolean>(`/v1/challenges/${id}/likes`)
    return result
  } catch (e) {
    console.error(e)
    throw new Error(
      `챌린지 좋아요를 불러오는데 실패하였습니다. get /v1/challenges/${id}/likes`,
    )
  }
}

export const post_challenges_$challengeId_likes = async (id: string) => {
  try {
    const result = await api.post(`/v1/challenges/${id}/likes`)
    return result
  } catch (e) {
    console.error(e)
    throw new Error(
      `챌린지 좋아요를 누르는데 실패하였습니다. post /v1/challenges/${id}/likes`,
    )
  }
}

export const delete_challenges_$challengeId_likes = async (id: string) => {
  try {
    const result = await api.delete(`/v1/challenges/${id}/likes`)
    return result
  } catch (e) {
    console.error(e)
    throw new Error(
      `챌린지 좋아요를 취소하는데 실패하였습니다. delete /v1/challenges/${id}/likes`,
    )
  }
}
