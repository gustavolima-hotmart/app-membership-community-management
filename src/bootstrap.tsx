import './styles.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from './app'
import { ReactQueryProvider } from './config/reactQuery'

const Bootstrap = (): JSX.Element => {
  return (
    <ReactQueryProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>
  )
}

export default Bootstrap
