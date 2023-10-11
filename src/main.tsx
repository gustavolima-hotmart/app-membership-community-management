import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import 'src/config/cosmos/baseConfig'

import './styles.css'

import App from './app'
import { ReactQueryProvider } from './config/reactQuery'

const Main = (): JSX.Element => {
  return (
    <ReactQueryProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>
  )
}

export default Main
