import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from "next/link"
import LatestArticle from '@/components/LatestArticle';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Head>
        <title>Denise`s Blog</title>
        <meta name="description" content="Blogs about programming" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.bio}>
        <h1 className={styles.sectionTitle}>Hey, I&apos;m Denise Ignatova (Nesy).</h1>
        <div className={styles["bio-lnks"]}>
          <div className={styles.wrapper}>
            <div className={styles["circle-img"]}>
              <Image src="/circle.jpg" width="60" height="60" alt="me"/>
            </div>
            <div className={styles.socials}>
              <Link target="_blank" href="https://www.linkedin.com/in/denise-ignatova/">
                <Image src="/linkedin.svg" height="30" width="30" alt="linkedIn"/>
              </Link>
              <Link target="_blank" href="https://x.com/IgnatovaDenise">
                <Image src="/circle_twiiter.svg" height="30" width="30" alt="twitter"/>
              </Link>
              <Link target="_blank" href="https://stackoverflow.com/users/6244213/denise-ignatova">
                <Image src="/circle_stackoverflow_icon.svg" height="30" width="30" alt="stackoverflow"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['bio-description']}>
        <p>I&apos;m a software engineer, letting out my feelings into poetry and short stories, piano player...</p>
        <p>Facinated by technology, machine learning and the countless opportunities that ML offers to us to change the health care!</p>
        <p>Working with amazing people and learning from them made me realize, how important is to share knowledge and information.
          I would try to explain in series of <Link href="/articles"><span className={styles.link}>articles</span></Link> what I have been learning and how my brain interprets it for me.
        </p>
      </div>
        <h1 className={styles.sectionTitle}>Latest Articles</h1>
        <LatestArticle/>
    </>
  )
}
