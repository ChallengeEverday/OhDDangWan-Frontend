import { createReducerContext } from "react-use"

type FormStatus = {
  isInvalid: boolean
}

const initialState: FormStatus = {
  isInvalid: false,
}

type FormStatusAction = { type: "SET_IS_INVALID"; isInvalid: boolean }

const reducer = (state: FormStatus, action: FormStatusAction) => {
  switch (action.type) {
    case "SET_IS_INVALID":
      return { ...state, isInvalid: action.isInvalid }
    default:
      return state
  }
}

export const [useFormStatus, FormStatusProvider] = createReducerContext(
  reducer,
  initialState,
)
