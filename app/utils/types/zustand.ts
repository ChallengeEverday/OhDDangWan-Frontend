export type ZustandStore<S, A> = S & A
export type ZustandCreateStore<S, A> = (
  set: (state: Partial<S>) => void,
) => ZustandStore<S, A>
