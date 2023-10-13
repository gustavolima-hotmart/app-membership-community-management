import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'

export type Fetcher<T = Response> = QueryFunction<T, QueryKey>

export type UseRequestOptions<Response, Select = Response> = UseQueryOptions<
  Response,
  Error,
  Select
>

export type UseRequestResult<T = Response> = {
  invalidate: () => Promise<void>
} & UseQueryResult<T, Error>
