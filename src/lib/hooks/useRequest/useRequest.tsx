import { useQueryClient, useQuery } from '@tanstack/react-query'

import type { Fetcher, UseRequestOptions, UseRequestResult } from './types'

export const useRequest = <Response, Select = Response>(
  keys: string[],
  fetcher: Fetcher<Response>,
  options?: UseRequestOptions<Response, Select>
): UseRequestResult<Select> => {
  const response = useQuery<Response, Error, Select>(keys, (ctx) => fetcher(ctx), { ...options })

  const queryClient = useQueryClient()

  const invalidate = (): Promise<void> => queryClient.invalidateQueries(keys)

  return { invalidate, ...response }
}
