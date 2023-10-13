import { useEffect } from 'react'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import 'src/config/cosmos/baseConfig'

import './styles.css'

import App from './app'
import api, { ReactQueryProvider } from './config/request'
import { Loading } from './lib/components'
import { useResetRequestConfig } from './lib/hooks'
import type { MainProps } from './main.types'

const Main = ({ children, slug, membershipInfo, theme, user }: MainProps): JSX.Element => {
  const { isResetting } = useResetRequestConfig({ token: user?.token ?? '' })

  useEffect(
    () => console.log(slug, membershipInfo, theme, user),
    [slug, membershipInfo, theme, user]
  )

  useEffect(() => {
    if (!user?.token) return

    api.defaults.headers.common.Authorization = `Bearer ${user?.token}`
  }, [user?.token])

  if (isResetting) {
    return <Loading />
  }

  return (
    <ReactQueryProvider>
      <App>{children}</App>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>
  )
}

export default Main
