import { logoutEventDispatch } from '@space-lib-events/logout'
import { renewTokenEventDispatch } from '@space-lib-events/renewToken'
import type { AxiosError } from 'axios'

import { HttpCodes } from 'src/lib/constants'

import request from './api'
import ApiError from './error'
import type { ApiErrorInformation } from './types'

export enum ApiErrorMessages {
  ExpiredToken = 'expired_accessToken',
  InvalidToken = 'Invalid JWT',
  ResourcesNotFound = 'Resources not found'
}

const whenGenericError = (error: AxiosError): Promise<ApiError> => {
  const genericError = new ApiError({
    message: error?.message,
    statusCode: HttpCodes.INTERNAL_SERVER_ERROR
  })

  return Promise.reject(genericError)
}

export const whenRequestWithError = (error: AxiosError): Promise<ApiError> => {
  if (error.request) {
    const requestError = new ApiError({
      statusCode: Number(error.code),
      message: error.request.toString()
    })

    return Promise.reject(requestError)
  }

  return whenGenericError(error)
}

const logout = (error: AxiosError<ApiErrorInformation>): void => {
  delete request.defaults.headers.common['Authorization']

  logoutEventDispatch({
    origin: error.config?.url ?? '',
    message: (error.response?.data?.message || error.message) ?? ''
  })
}

const renewToken = (): void => {
  delete request.defaults.headers.common['Authorization']
  renewTokenEventDispatch()
}

const handleUnauthorizedError = (error: AxiosError<ApiErrorInformation>): void => {
  const errorDataMessage = error.response?.data.message

  if (errorDataMessage) {
    const isExpiredToken = errorDataMessage.includes(ApiErrorMessages.ExpiredToken)
    const isInvalidToken = errorDataMessage.includes(ApiErrorMessages.InvalidToken)
    const isResourcesNotFound = errorDataMessage.includes(ApiErrorMessages.ResourcesNotFound)

    if (isExpiredToken || isResourcesNotFound) {
      renewToken()
    }

    if (isInvalidToken) {
      logout(error)
    }
  }
}

export const whenResponseWithError = (
  error: AxiosError<ApiErrorInformation>
): Promise<ApiError> => {
  if (error.response) {
    const { status } = error.response

    if (status === HttpCodes.UNAUTHORIZED) {
      handleUnauthorizedError(error)
    }

    const responseError = new ApiError({
      headers: error.response.headers,
      statusCode: error.response.status,
      extra: error.response.data?.extra,
      message: error.response.data?.message ?? ''
    })

    return Promise.reject(responseError)
  }

  return whenGenericError(error)
}
