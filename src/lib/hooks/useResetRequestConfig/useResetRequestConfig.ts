import { useEffect, useState } from 'react'

import request, { queryClient } from 'src/config/request'

type Params = {
  token: string
}

const setRequestHeaders = (token: string): void => {
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const clearRequestHeaders = (): void => {
  delete request.defaults.headers.common['Authorization']
}

const useResetRequestConfig = ({
  token
}: Params): {
  isResetting: boolean
} => {
  const [isResetting, setIsResetting] = useState<boolean>(true)

  useEffect(() => {
    const resetQueries = async (): Promise<void> => {
      await queryClient.resetQueries()
      setIsResetting(false)
    }

    setRequestHeaders(token)
    resetQueries()

    return (): void => clearRequestHeaders()
  }, [token])

  return { isResetting }
}

export default useResetRequestConfig
