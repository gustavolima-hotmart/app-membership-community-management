import { Suspense } from 'react'

import { Home } from './pages'

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<>Loading</>}>
      <Home />
    </Suspense>
  )
}

export default App
