import { FIREBASE_INSTANCE, getFirebaseConfig } from './constants'

import type { UseGetFirebaseConnectionResult } from './types'

import { useRequest } from '../useRequest'

export const useGetFirebaseConnection = (): UseGetFirebaseConnectionResult => {
  const { data: firebaseConnectionInstance, invalidate: invalidateFirebaseConnectionQuery } =
    useRequest([FIREBASE_INSTANCE], () => getFirebaseConfig)

  return { firebaseConnectionInstance, invalidateFirebaseConnectionQuery }
}
