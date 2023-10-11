import { Suspense } from 'react'

import { Loading } from './lib/components'
import { H2 } from './pages'

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <H2 />
    </Suspense>
  )
}

export default App
