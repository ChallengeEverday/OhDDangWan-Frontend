export enum ChallengeCategory {
  운동 = "EXERCISE",
  생활습관 = "HABIT",
  독서 = "READING",
  학습 = "STUDY",
}
export enum ChallengeCategoryKo {
  EXERCISE = "운동",
  HABIT = "생활습관",
  READING = "독서",
  STUDY = "학습",
}

export type ChallengeCategoryKey = keyof typeof ChallengeCategory
export const CHALLENGE_CATEGORY_LIST = Object.keys(
  ChallengeCategory,
) as ChallengeCategoryKey[]

export const CHALLENGE_CATEGORY_NAV_LIST: {
  category: ChallengeCategoryKey
  emoji: string
}[] = [
  { category: "운동", emoji: "🏋️‍♂️" },
  { category: "생활습관", emoji: "🧘‍♂️" },
  { category: "독서", emoji: "📚" },
  { category: "학습", emoji: "📖" },
]

export type ChallengeForm = {
  /** 챌린지 제목 */
  title: POST_ChallengeForm["title"]
  /** 챌린지 설명 */
  description: POST_ChallengeForm["description"]
  /** 챌린지 인증 방법 */
  authenticationDescription: POST_ChallengeForm["authenticationDescription"]
  /** 챌린지 시작 날짜 */
  challengeStartDate: POST_ChallengeForm["challengeStartDate"]
  /** 챌린지 종료 날짜 */
  challengeEndDate: POST_ChallengeForm["challengeEndDate"]
  /** 챌린지 주기 (ex. 금,토,일 => [true,0,0,0,0,true,true]) */
  challengeCycle: [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
  ]
  /** 챌린지 이미지 url */
  thumbnailImage?: File
  /** 챌린지 검색 해시태그 */
  hashtags: POST_ChallengeForm["hashtags"]
}

export type POST_ChallengeForm = {
  /** 챌린지 제목 */
  title: string
  /** 챌린지 설명 */
  description: string
  /** 챌린지 인증 방법 */
  authenticationDescription: string
  /** 챌린지 시작 날짜 */
  challengeStartDate: string
  /** 챌린지 종료 날짜 */
  challengeEndDate: string
  /** 챌린지 주기 (ex. 금,토,일 => 0000111 => 7) */
  challengeCycle: number
  /** 챌린지 이미지 url */
  thumbnailImageUrl?: string
  /** 챌린지 검색 해시태그 */
  hashtags: string[]
}

export type ChallengeDto = {
  createdAt: string
  modifiedAt: string
  challengeId: number
  title: string
  description: string
  authenticationDescription: string
  challengeCycle: number
  challengeStartDate: string
  challengeEndDate: string
  ownerId: number
  thumbnailImageUrl?: string
  hashtags: string[]
}

export type HastagDto = {
  createdAt: string
  modifiedAt: string
  hashtagId: number
  tagName: string
  challenge: ChallengeDto
}

export type ChallengeMainResponseDto = {
  /** 챌린지 id */
  id: number
  /** 챌린지 제목 */
  title: string
  /** 챌린지 설명 */
  description: string
  /** 챌린지 이미지 url */
  thumbnailImageUrl?: string
  /** 챌린지 만들어진 날짜 및 시간 */
  challengeCreatedAt: string
  /** 최신 인증 날짜 및 시간 */
  authenticationDateTime: string
  /** 챌린지 검색 해시태그 */
  hashtags: string[]

  /** 챌린지 인증 방법 */
  authenticationDescription: string
  /** 챌린지 시작 날짜 */
  challengeStartDate: string
  /** 챌린지 주기 (ex. 금,토,일 => 0000111 => 7) */
  challengeCycle: number
  /** 방장 id */
  ownerId: number
}

export type GET_ChallengeMainResponseDto = {
  title: string
  description: string
  challengeCycle: number
  challengeStartDate: string
  challengeEndDate: string
  ownerNickname: string
  ownerProfileImageUrl: string
  thumbnailImageUrl: string
  hashtags: string[]
}

export type GET_params_challenges = {
  page?: number
  size?: number
  sortColumn?: "CREATED_AT" | "LIKE_COUNT"
  sortOrder?: "ASC" | "DESC"
}

export type Pagenation<R> = {
  result: R
  metadata: {
    totalCount: number
    totalPageCount: number
    size: number
    lastId: string
    currentPageNumber: number
  }
}
