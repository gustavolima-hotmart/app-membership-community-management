const path = require('path')

const resolve = (pathName) => path.resolve(__dirname, pathName)

module.exports = {
  APP: resolve('../../../src/app'),
  DIST: resolve('../../../dist'),
  LIB: resolve('../../../src/lib'),
  CONFIG: resolve('../../../src/config'),
  CORE: resolve('../../../src/core'),
  PAGES: resolve('../../../src/pages'),
  PUBLIC: resolve('../../../public'),
  ROOT: resolve('../../../'),
  SRC: resolve('../../../src'),
  INDEX: resolve('../../../src/index'),
  ASSETS: resolve('../../../src/assets'),
  TS_CONFIG: {
    development: resolve('../../../tsconfig.json'),
    staging: resolve('../../../tsconfig.prod.json'),
    production: resolve('../../../tsconfig.prod.json')
  },
  ENV: {
    development: resolve('../../../environments/.env.development'),
    staging: resolve('../../../environments/.env.staging'),
    production: resolve('../../../environments/.env.production')
  },
  COSMOS: resolve('../../../node_modules/@hotmart-org-ca/cosmos/dist'),
  COSMOS_WEB: resolve('../../../node_modules/@hotmart-org-ca/cosmos-web/dist/react'),
  SPACE_LIB: resolve('../../../node_modules/@hotmart/space-lib/dist'),
  SPACE_LIB_EVENTS: resolve('../../../node_modules/@hotmart/space-lib-events/dist')
}