import type { Analytics } from 'firebase/analytics'
import { getAnalytics, setUserProperties } from 'firebase/analytics'
import type { FirebaseApp } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import type { RemoteConfig } from 'firebase/remote-config'
import { fetchAndActivate, getValue, getRemoteConfig } from 'firebase/remote-config'

import defaultFeatureFlags from './feature-flags.json'
import { firebaseConfig } from './firebaseConfig'
import defaultRemoteConfigs from './remote-configs.json'
import type { FeatureFlagName, FeatureFlagsMap, RemoteConfigName, RemoteConfigsType } from './types'

class FirebaseConnection {
  app: FirebaseApp
  remoteConfig: RemoteConfig
  analytics: Analytics

  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.remoteConfig = getRemoteConfig(this.app)
    this.analytics = getAnalytics(this.app)
    this.remoteConfig.defaultConfig = { ...defaultFeatureFlags, ...defaultRemoteConfigs }
    this.remoteConfig.settings.minimumFetchIntervalMillis = 0
  }

  async getFirebaseConfig(): Promise<FirebaseConnection> {
    await fetchAndActivate(this.remoteConfig)

    return this
  }

  getFlag(flag: FeatureFlagName): boolean {
    return getValue(this.remoteConfig, flag)?.asBoolean() ?? false
  }

  getFlags(): FeatureFlagsMap {
    const flags = {} as FeatureFlagsMap
    const flagsList = Object.keys(defaultFeatureFlags) as FeatureFlagName[]

    flagsList.forEach((key) => {
      flags[key] = getValue(this.remoteConfig, key).asBoolean()
    })

    return flags
  }

  getRemoteConfig(): RemoteConfigsType {
    const remoteConfig = {} as RemoteConfigsType
    const remoteConfigList = Object.keys(defaultRemoteConfigs) as RemoteConfigName[]

    remoteConfigList.forEach((key) => {
      const itemString = getValue(this.remoteConfig, key).asString()
      try {
        remoteConfig[key] = JSON.parse(itemString)
      } catch (error) {
        remoteConfig[key] = itemString
      }
    })

    return remoteConfig
  }

  setUserProperties(properties: Record<string, Primitive>): void {
    setUserProperties(this.analytics, properties)
  }
}

export default new FirebaseConnection()
