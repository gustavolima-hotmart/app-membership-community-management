import { HcAlert } from '@hotmart-org-ca/cosmos-web/dist/react/hc-alert'

import styles from './home.module.css'

const Home = (): JSX.Element => {
  return (
    <div className={styles.box}>
      <HcAlert context='info' dismissible>
        My first alert!
      </HcAlert>

      <main className={styles.main}>
        <span>The main</span>
      </main>
    </div>
  )
}

export default Home
