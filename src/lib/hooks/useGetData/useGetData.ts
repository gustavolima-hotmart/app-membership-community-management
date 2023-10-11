import { useEffect, useState } from 'react'

enum REQ_STATUS {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error'
}

export const promiseWrapper = <T = unknown>(promise: Promise<T>): (() => T) => {
  let status = REQ_STATUS.PENDING
  let result: T

  const pendingState = promise.then(
    (value: T) => {
      status = REQ_STATUS.SUCCESS
      result = value
    },
    (error: T) => {
      status = REQ_STATUS.ERROR
      result = error
    }
  )

  return (): T => {
    switch (status) {
      case REQ_STATUS.PENDING:
        throw pendingState
      case REQ_STATUS.SUCCESS:
        return result
      case REQ_STATUS.ERROR:
        throw result
      default:
        throw new Error('Unknown status')
    }
  }
}

export const useGetData = <T>(promise: Promise<T>): T | null => {
  const [resource, setResource] = useState<T | null>(null)
  useEffect(() => {
    const getData = async (): Promise<void> => {
      setResource(promiseWrapper(promise))
    }
    getData()
  }, [promise])

  return resource
}
