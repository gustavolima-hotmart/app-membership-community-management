import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './queryClient'
import type { ReactQueryProviderProps } from './types'

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps): JSX.Element => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
