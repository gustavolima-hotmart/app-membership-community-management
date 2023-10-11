import type { firebaseConnection } from 'src/config/firebase'

export type UseGetFirebaseConnectionResult = {
  firebaseConnectionInstance?: typeof firebaseConnection
  invalidateFirebaseConnectionQuery: () => Promise<void>
}
