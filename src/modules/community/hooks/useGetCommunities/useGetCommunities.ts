import { useParams } from 'react-router-dom'

import type { UseRequestResult } from 'src/lib/hooks'
import { useRequest } from 'src/lib/hooks'
import { CommunityEndpoints } from 'src/modules/community/constants'
import CommunityService from 'src/modules/community/service'
import type { CommunitiesResponse } from 'src/modules/community/types'
import type { RouteParams } from 'src/router/routes'

const useGetCommunities = (): UseRequestResult<CommunitiesResponse> => {
  const { membership } = useParams<RouteParams>()

  return useRequest([CommunityEndpoints.getCommunities()], ({ signal }) =>
    CommunityService.getAll({ signal, slug: membership! })
  )
}

export default useGetCommunities
