import type defaultFeatureFlags from './feature-flags.json'
import type { firebaseConfig } from './firebaseConfig'
import type remoteConfigs from './remote-configs.json'

export type FirebaseConfigType = typeof firebaseConfig

export type FeatureFlagsMap = typeof defaultFeatureFlags

export type FeatureFlagName = keyof FeatureFlagsMap

export type RemoteConfigsType = typeof remoteConfigs

export type RemoteConfigName = keyof RemoteConfigsType
