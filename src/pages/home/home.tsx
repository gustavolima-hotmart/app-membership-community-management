import styles from './home.module.css'

const Home = (): JSX.Element => {
  return (
    <div className={styles.box}>
      <main className={styles.main}>
        <span>The main</span>
      </main>
    </div>
  )
}

export default Home
