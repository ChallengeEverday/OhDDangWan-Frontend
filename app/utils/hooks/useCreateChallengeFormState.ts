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
      type: "SET_CHALLENGE_START_TIME"
      challengeStartDate: ChallengeForm["challengeStartDate"]
    }
  | {
      type: "SET_CHALLENGE_END_TIME"
      challengeEndDate: ChallengeForm["challengeEndDate"]
    }
  | {
      type: "ADD_CHALLENGE_WEEKLY"
      challengeCycle: 요일
    }
  | {
      type: "REMOVE_CHALLENGE_WEEKLY"
      challengeCycle: 요일
    }
  | {
      type: "RESET_CHALLENGE_WEEKLY"
    }
  | {
      type: "SET_THUMBNAIL_IMAGE"
      thumbnailImage: File
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
    case "SET_CHALLENGE_START_TIME":
      return { ...state, challengeStartDate: action.challengeStartDate }
    case "SET_CHALLENGE_END_TIME":
      return { ...state, challengeEndDate: action.challengeEndDate }
    case "SET_THUMBNAIL_IMAGE":
      return { ...state, thumbnailImage: action.thumbnailImage }

    // 챌린지 요일 주기
    case "ADD_CHALLENGE_WEEKLY": {
      const challengeCycle = state.challengeCycle
      challengeCycle[요일별한글.indexOf(action.challengeCycle)] = true
      return {
        ...state,
        challengeCycle,
      }
    }

    case "REMOVE_CHALLENGE_WEEKLY": {
      const challengeCycle = state.challengeCycle
      challengeCycle[요일별한글.indexOf(action.challengeCycle)] = false
      return {
        ...state,
        challengeCycle,
      }
    }

    case "RESET_CHALLENGE_WEEKLY":
      return {
        ...state,
        challengeCycle: initialState.challengeCycle,
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
  /** 챌린지 시작 날짜 */
  challengeStartDate: "",
  /** 챌린지 종료 날짜 */
  challengeEndDate: "",
  /** 챌린지 위클리 (ex. 금,토,일 => 0000111 => 7) */
  challengeCycle: [false, false, false, false, false, false, false],
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
    challengeStartDate,
    challengeEndDate,
    challengeCycle,
  } = challengeForm

  return (
    !title ||
    !description ||
    !authenticationDescription ||
    !challengeStartDate ||
    !challengeEndDate ||
    !challengeCycle.some((day) => day)
  )
}
