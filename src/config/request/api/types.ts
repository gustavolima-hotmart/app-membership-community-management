import type { AxiosRequestHeaders } from 'axios'

export type ApiErrorInformation = {
  code: string
  extra: unknown
  status: string
  details: string
  currentDate: string
  message?: string
}

export type RequestHeaders = AxiosRequestHeaders
