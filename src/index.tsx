import { createRoot } from 'react-dom/client'

import Bootstrap from './bootstrap'

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(<Bootstrap />)
