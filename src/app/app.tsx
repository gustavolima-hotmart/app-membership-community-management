import type { ReactNode } from 'react'
import { Suspense } from 'react'

import { Loading } from 'src/lib/components'

type AppProps = {
  children: ReactNode
}

const App = ({ children }: AppProps): JSX.Element => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default App
