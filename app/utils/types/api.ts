export type Error = {
  errors: {errorCode: number, errorMsg: string}[]
}

export function isError(error: unknown): error is Error {
  return error !== null && typeof error === 'object' && 'errors' in error;
}