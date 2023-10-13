import { QueryClient } from '@tanstack/react-query'

import { HttpCodes } from 'src/lib/constants'

import { DEFAULT_STALE_TIME } from './constants'

import request, { type ApiError } from '../api'

export const retry = (failureCount: number, error: unknown): boolean => {
  const isTokenAttachedToHeader = Boolean(request.defaults.headers.common['Authorization'])

  if (!isTokenAttachedToHeader) {
    return false
  }

  const maxRetries = 2
  const statusCode = (error as ApiError).statusCode

  const isTotalOfFailureLowerOrEqualMaxRetries = failureCount <= maxRetries

  return (
    (statusCode < HttpCodes.BAD_REQUEST || statusCode >= HttpCodes.INTERNAL_SERVER_ERROR) &&
    isTotalOfFailureLowerOrEqualMaxRetries
  )
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry,
      refetchOnWindowFocus: false,
      suspense: true,
      staleTime: DEFAULT_STALE_TIME
    }
  }
})
