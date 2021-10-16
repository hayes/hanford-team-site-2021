import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import CommentThread from '../components/CommentThread'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hanford Internet Stuff!</title>
        <meta name="description" content="Spooky scary internet themed frisbee memes`" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommentThread id="example" />
    </div>
  )
}

export default Home
