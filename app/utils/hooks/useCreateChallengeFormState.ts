import { createReducerContext } from "react-use"
import { ChallengeForm } from "@/app/utils/types/challenge"
import { 요일, 요일별한글 } from "@/app/utils/dayjs"

type ChallengeAction =
  | { type: "SET_CHALLENGE"; challengeForm: Partial<ChallengeForm> }
  | { type: "SET_TITLE"; title: ChallengeForm["title"] }
  | { type: "SET_DESCRIPTION"; description: ChallengeForm["description"] }
  | {
      type: "SET_AUTHENTICATION_DESCRIPTION"
      authenticationDescription: ChallengeForm["authenticationDescription"]
    }
  | {
      type: "SET_CHALLENGE_CYCLE"
      challengeCycle: ChallengeForm["challengeCycle"]
    }
  | {
      type: "SET_CHALLENGE_START_TIME"
      challengeStartTime: ChallengeForm["challengeStartTime"]
    }
  | {
      type: "SET_CHALLENGE_END_TIME"
      challengeEndDate: ChallengeForm["challengeEndDate"]
    }
  | {
      type: "ADD_CHALLENGE_WEEKLY"
      challengeWeekly: 요일
    }
  | {
      type: "REMOVE_CHALLENGE_WEEKLY"
      challengeWeekly: 요일
    }
  | {
      type: "RESET_CHALLENGE_WEEKLY"
    }
  | { type: "SET_OWNER_ID"; ownerId: ChallengeForm["ownerId"] }
  | {
      type: "SET_THUMBNAIL_IMAGE_URL"
      thumbnailImageUrl: ChallengeForm["thumbnailImageUrl"]
    }
  | { type: "ADD_HASHTAG"; hashtag: string }
  | { type: "REMOVE_HASHTAG"; hashtag: string }
  | { type: "RESET_HASHTAGS" }
  | { type: "RESET_CHALLENGE" }

const reducer = (state: ChallengeForm, action: ChallengeAction) => {
  switch (action.type) {
    case "SET_CHALLENGE":
      return { ...state, ...action.challengeForm }
    case "SET_TITLE":
      return { ...state, title: action.title }
    case "SET_DESCRIPTION":
      return { ...state, description: action.description }
    case "SET_AUTHENTICATION_DESCRIPTION":
      return {
        ...state,
        authenticationDescription: action.authenticationDescription,
      }
    case "SET_CHALLENGE_CYCLE":
      return { ...state, challengeCycle: action.challengeCycle }
    case "SET_CHALLENGE_START_TIME":
      return { ...state, challengeStartTime: action.challengeStartTime }
    case "SET_CHALLENGE_END_TIME":
      return { ...state, challengeEndDate: action.challengeEndDate }
    case "SET_OWNER_ID":
      return { ...state, ownerId: action.ownerId }

    case "SET_THUMBNAIL_IMAGE_URL":
      return { ...state, thumbnailImageUrl: action.thumbnailImageUrl }

    // 챌린지 요일 주기
    case "ADD_CHALLENGE_WEEKLY": {
      const challengeWeekly = state.challengeWeekly
      challengeWeekly[요일별한글.indexOf(action.challengeWeekly)] = true
      return {
        ...state,
        challengeWeekly,
      }
    }

    case "REMOVE_CHALLENGE_WEEKLY": {
      const challengeWeekly = state.challengeWeekly
      challengeWeekly[요일별한글.indexOf(action.challengeWeekly)] = false
      return {
        ...state,
        challengeWeekly,
      }
    }

    case "RESET_CHALLENGE_WEEKLY":
      return {
        ...state,
        challengeWeekly: initialState.challengeWeekly,
      }

    // 해시태그
    case "ADD_HASHTAG": {
      if (state.hashtags.includes(action.hashtag)) {
        return state
      }
      return {
        ...state,
        hashtags: [...state.hashtags, action.hashtag],
      }
    }
    case "REMOVE_HASHTAG":
      return {
        ...state,
        hashtags: state.hashtags.filter((tag) => tag !== action.hashtag),
      }
    case "RESET_HASHTAGS":
      return { ...state, hashtags: initialState.hashtags }

    case "RESET_CHALLENGE":
      return initialState
    default:
      return state
  }
}

const initialState: ChallengeForm = {
  /** 챌린지 제목 */
  title: "",
  /** 챌린지 설명 */
  description: "",
  /** 챌린지 인증 방법 */
  authenticationDescription: "",
  /** 챌린지 주기 */
  challengeCycle: 0,
  /** 챌린지 시작 날짜 */
  challengeStartTime: "",
  /** 챌린지 종료 날짜 */
  challengeEndDate: "",
  /** 챌린지 위클리 (ex. 금,토,일 => 0000111 => 7) */
  challengeWeekly: [false, false, false, false, false, false, false],
  /** 방장 id */
  ownerId: 0,
  /** 챌린지 이미지 url */
  thumbnailImageUrl: "",
  /** 챌린지 검색 해시태그 */
  hashtags: [],
}

export const [useChallengeForm, ChallengeFormProvider] = createReducerContext(
  reducer,
  initialState,
)

export const checkInvalid = (challengeForm: ChallengeForm) => {
  const {
    title,
    description,
    authenticationDescription,
    challengeCycle,
    challengeStartTime,
    challengeEndDate,
    ownerId,
    challengeWeekly,
  } = challengeForm

  return (
    !title ||
    !description ||
    !authenticationDescription ||
    !challengeCycle ||
    !challengeStartTime ||
    !challengeEndDate ||
    !ownerId ||
    !challengeWeekly.some((day) => day)
  )
}
