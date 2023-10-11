import type { ReactNode } from 'react'

import type { FeatureFlagName, RemoteConfigName } from 'src/config/firebase'

export type FeatureFlagsContextProps = {
  isEnabledFF: (flag: FeatureFlagName) => boolean
  getConfig: (config: RemoteConfigName) => Primitive | null
}

export type FeatureFlagsProviderProps = {
  children: ReactNode
}
