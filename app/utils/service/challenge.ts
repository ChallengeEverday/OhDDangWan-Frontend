import axios from "axios"
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

// 챌린지 목록
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}

// 카테고리별 챌린지
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}

// 챌린지 상세
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}

// 챌린지 생성
export const post_challenges = async (challengeForm: POST_ChallengeForm) => {
  try {
    const result = await api.post<number>("/v1/challenges", challengeForm)
    return result
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}

// 좋아요 여부
export const get_challenges_$challengeId_likes = async (id: string) => {
  try {
    const result = await api.get<boolean>(`/v1/challenges/${id}/likes`)
    return result
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}

// 좋아요
export const post_challenges_$challengeId_likes = async (id: string) => {
  try {
    const result = await api.post(`/v1/challenges/${id}/likes`)
    return result
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}

// 좋아요 취소
export const delete_challenges_$challengeId_likes = async (id: string) => {
  try {
    const result = await api.delete(`/v1/challenges/${id}/likes`)
    return result
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}

// 챌린지 참여
export const post_challenges_participate_$challengeId = async (id: string) => {
  try {
    const result = await api.post(`/v1/challenges/participate/${id}`)
    return result
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}

// 챌린지 참여 여부
export const get_challenges_participate_$challengeId_status = async (id: string) => {
  try {
    const result = await api.get<boolean>(`/v1/challenges/participate/${id}/status`)
    return result
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}