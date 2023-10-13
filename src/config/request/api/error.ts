type Error = {
  statusCode: number
  message: string
  headers?: Record<string, string>
  extra?: unknown
}

class ApiError {
  private _statusCode: number
  private _message: string
  private _headers?: Record<string, string>
  private _extra?: unknown

  constructor({ statusCode, message, headers, extra }: Error) {
    this._statusCode = statusCode
    this._message = message
    this._headers = headers
    this._extra = extra
  }

  get statusCode(): number {
    return this._statusCode
  }

  get message(): string {
    return this._message
  }

  get headers(): Record<string, string> | undefined {
    return this._headers
  }

  get extra(): unknown {
    return this._extra
  }
}

export default ApiError
