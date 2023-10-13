/* eslint-disable react/no-deprecated */
import ReactDOM from 'react-dom'

import { bootstrapConfig } from './bootstrap.config'
import Main from './main'

const container = document.getElementById('root')

ReactDOM.render(<Main {...bootstrapConfig} />, container)
