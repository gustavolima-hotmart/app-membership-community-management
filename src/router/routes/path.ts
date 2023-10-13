const HOME_PATH = '/' as const
const CLUB_HOME_PATH = '/:lang/club/:membership' as const
const COMMUNITIES_PATH = `${CLUB_HOME_PATH}/community/management` as const
const COMMUNITY_PATH = `${COMMUNITIES_PATH}/:communityId` as const

export const path = {
  HOME_PATH,
  CLUB_HOME_PATH,
  COMMUNITIES_PATH,
  COMMUNITY_PATH
}
