export enum CommunityMemberPermissionsGroup {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  FOLLOWER = 'FOLLOWER',
  VIEWER = 'VIEWER'
}

export enum PermissionActions {
  ACCESS_AND_PRIVACY = 'ACCESS_AND_PRIVACY',
  ADMIN_UPDATE = 'ADMIN_UPDATE',
  BLOCK_ADMIN_CREATE = 'BLOCK_ADMIN_CREATE',
  BLOCK_CREATE = 'BLOCK_CREATE',
  BLOCK_DELETE = 'BLOCK_DELETE',
  BLOCK_MEMBER_CREATE = 'BLOCK_MEMBER_CREATE',
  BLOCK_MODERATOR_CREATE = 'BLOCK_MODERATOR_CREATE',
  BLOCK_READ = 'BLOCK_READ',
  COLLECTION_DELETE = 'COLLECTION_DELETE',
  COLLECTION_UPDATE = 'COLLECTION_UPDATE',
  COMMENT_DELETE = 'COMMENT_DELETE',
  COMMENT_HIDE = 'COMMENT_HIDE',
  COMMENT_SORTITION_CREATE = 'COMMENT_SORTITION_CREATE',
  COMMUNITY_ADMIN_ONBOARDING_VIEW = 'COMMUNITY_ADMIN_ONBOARDING_VIEW',
  FOLLOW_REQUEST_READ = 'FOLLOW_REQUEST_READ',
  FOLLOW_REQUEST_UPDATE = 'FOLLOW_REQUEST_UPDATE',
  GROUP_CREATE = 'GROUP_CREATE',
  GROUP_DELETE = 'GROUP_DELETE',
  GROUP_READ = 'GROUP_READ',
  GROUP_UPDATE = 'GROUP_UPDATE',
  MEMBER_DELETE = 'MEMBER_DELETE',
  MEMBER_ROLE_READ = 'MEMBER_ROLE_READ',
  MEMBER_UPDATE = 'MEMBER_UPDATE',
  MODERATOR_UPDATE = 'MODERATOR_UPDATE',
  PIN_CREATE = 'PIN_CREATE',
  PIN_DELETE = 'PIN_DELETE',
  POST_CREATE = 'POST_CREATE',
  POST_DELETE = 'POST_DELETE',
  POST_REVIEW_UPDATE = 'POST_REVIEW_UPDATE',
  SCHEDULED_POST_CREATE = 'SCHEDULED_POST_CREATE',
  SCHEDULED_POST_DELETE = 'SCHEDULED_POST_DELETE',
  SCHEDULED_POST_READ = 'SCHEDULED_POST_READ',
  STRIKE_CREATE = 'STRIKE_CREATE',
  STRIKE_DELETE = 'STRIKE_DELETE',
  STRIKE_READ = 'STRIKE_READ'
}

export type CommunityMemberPermissions = {
  group: CommunityMemberPermissionsGroup
  actions?: Array<PermissionActions>
}

export type ThemeProps = 'light' | 'dark'

export type User = {
  id: string
  token: string
  authorities: string[]
  name: string
  email: string
  ucode: string
  avatar?: string
  permissions?: CommunityMemberPermissions
}

export type Logos = {
  type: ThemeProps
  imageUrl: string
}

export type Banners = {
  imageUrlWeb: string
  imageUrlMobile: string
  url: string
  altText: string
}

export type OrientationTypes = 'HORIZONTAL' | 'VERTICAL'

export type Orientation = {
  global: OrientationTypes
}

export type Settings = {
  primaryColor: string
  logoAltText: string
  logos: Logos[]
  banners: Banners[]
  orientation?: Orientation
  labelMyPurchase?: string
  labelProductsOnSale?: string
}

export type MembershipProps = {
  name: string
  ownerUcode: string
  settings: Settings
  roles: string[]
  slug: string
  ownerId?: number
}
