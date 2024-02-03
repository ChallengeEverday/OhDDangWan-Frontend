import { create } from "zustand"
import { Profile } from "../types/account"
import { createJSONStorage, persist } from "zustand/middleware"
import { ZustandCreateStore } from "../types/zustand"

type UserInfoStore = {
  userInfo: Profile | null
}

type UserInfoActions = {
  setUserInfo: (userInfo: Profile) => void
  removeUserInfo: () => void
}

type ZustandUserInfoStore = ZustandCreateStore<UserInfoStore, UserInfoActions>

const createUserInfoStore: ZustandUserInfoStore = (set) => ({
  userInfo: null,

  actions: {
    setUserInfo: (userInfo) => set({ userInfo }),
    removeUserInfo: () => set({ userInfo: null }),
  },
})

export const useUserInfoStore = create(
  persist(createUserInfoStore, {
    name: "userInfo",
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
  }),
)

// export const useUserInfoStore = create<
//   ZustandStore<UserInfoStore, UserInfoActions>
// >()(
//   devtools(
//     persist(
//       (set) => ({
//         isLogin: false,
//         userInfo: null,

//         actions: {
//           login: () => set({ isLogin: true }),
//           logout: () => set({ isLogin: false }),

//           setUserInfo: (userInfo) => set({ userInfo, isLogin: true }),
//           removeUserInfo: () => set({ userInfo: null, isLogin: false }),
//         },
//       }),
//       {
//         name: "userInfoStore",
//       },
//     ),
//   ),
// )
