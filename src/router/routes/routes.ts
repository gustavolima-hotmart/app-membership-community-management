import { lazy } from 'react'

import { path } from './path'

const Home = lazy(() => import('src/pages/home'))
const Details = lazy(() => import('src/pages/b'))

const normalizePath = (_path: string): string => {
  return _path.replace(path.COMMUNITIES_PATH, '')
}

const routes = [
  {
    path: path.HOME_PATH,
    component: Home,
    index: true
  },
  {
    path: normalizePath(path.COMMUNITY_PATH),
    component: Details
  }
]

export default routes
