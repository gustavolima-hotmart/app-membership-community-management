import request from 'src/config/request'

import { CommunityEndpoints } from './constants'
import type { CommunitiesResponse } from './types'

type GetAllProps = {
  signal?: AbortSignal
  rows?: number
  slug: string
}

const DEFAULT_ROWS_SIZE = 25

class CommunityService {
  static getAll = async ({ signal, rows, slug }: GetAllProps): Promise<CommunitiesResponse> => {
    const params = new URLSearchParams({
      slug,
      rows: `${rows ?? DEFAULT_ROWS_SIZE}`
    })

    const { data } = await request.get<CommunitiesResponse>(CommunityEndpoints.getCommunities(), {
      signal,
      params
    })

    return data
  }
}

export default CommunityService
