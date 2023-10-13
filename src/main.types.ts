import type { User, ThemeProps, MembershipProps } from './types'

/**
 * @user this prop should always be received, it's optional here just to allow us to run the microfront without the shell
 */
export type MainProps = {
  slug: string
  user?: User
  locale?: string
  basename?: string
  theme?: ThemeProps
  membershipInfo?: MembershipProps
  children?: React.ReactNode
}
