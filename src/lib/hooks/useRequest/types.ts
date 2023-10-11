import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'

export type Fetcher<Response> = () => Response | Promise<Response>

export type UseRequestOptions<Response, Select = Response> = UseQueryOptions<
  Response,
  Error,
  Select
>

export type UseRequestResult<T = Response> = {
  invalidate: () => Promise<void>
} & UseQueryResult<T, Error>
