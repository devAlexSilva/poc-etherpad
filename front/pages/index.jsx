import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>etherpad</title>
        <meta name="description" content="etherpad POC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          should log in to access the text editor
        </h1>

        <div className={styles.grid}>
          <button className={styles.card}>
            <Link href="/register">
              sign up
            </Link>
          </button>
          <button className={styles.card}>
            <Link href="/login">
              log in
            </Link>
          </button>
        </div>

      </main>
    </div>
  )
}

// sign up é um verbo
// sign-up é substantivo ou adjetivo