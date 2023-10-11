import { createContext, useContext } from 'react'

import type { FeatureFlagName, RemoteConfigName } from 'src/config/firebase'

import { useGetFirebaseConnection } from 'src/lib/hooks'

import type { FeatureFlagsContextProps, FeatureFlagsProviderProps } from '../../types'

const FeatureFlagsContext = createContext<FeatureFlagsContextProps>({} as FeatureFlagsContextProps)

export const FeatureFlagsProvider = ({ children }: FeatureFlagsProviderProps): JSX.Element => {
  const { firebaseConnectionInstance } = useGetFirebaseConnection()

  const isEnabledFF = (flag: FeatureFlagName): boolean =>
    firebaseConnectionInstance?.getFlag(flag) ?? false

  const getConfig = (config: RemoteConfigName): Primitive | null =>
    firebaseConnectionInstance?.getRemoteConfig()?.[config] ?? null

  return (
    <FeatureFlagsContext.Provider
      value={{
        getConfig,
        isEnabledFF
      }}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export const useFeatureFlagsContext = (): FeatureFlagsContextProps => {
  const context = useContext(FeatureFlagsContext)

  if (!context) {
    throw new Error('Hook must be under a FeatureFlagsContext provider')
  }

  return context
}
