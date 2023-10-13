import type { CommunityMemberPermissionsGroup, PermissionActions } from 'src/types'

export type OwnerCollectionsPermissions = {
  group: `${CommunityMemberPermissionsGroup}`
  actions?: PermissionActions[]
}

export type CommunityProps = {
  id: number
  icon: string
  name: string
  description: string
  ownerPictureUrl: string
  imageDescription: string
  owner: string
  lastPostDate: number
  followersCount: number
  ownerId: number
  isOwner: boolean
  coverImageURL: string
  coverDescription?: string
  hotlink: string
  imageURL: string
  isOwnerOrFollower: boolean
  type: number
  productId?: number
  ownerCollectionPermissions?: OwnerCollectionsPermissions
  permissions?: OwnerCollectionsPermissions
  isCollaborative?: boolean
}

export type CommunitiesResponse = { data: CommunityProps[]; nextPageParam: number }
