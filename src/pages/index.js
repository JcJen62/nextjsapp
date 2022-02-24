import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Anime Page</title>
      </Head>

      <main id='homePage'>
        <NavBar />
        <h1 id='headHome'>Welcome to my Anime Page</h1>
        <div id='heroImg'>
          <Image
            src="/static/images/background.jpg"
            alt="Hero Image"
            width={1400}
            height={500}
          />
        </div>
      </main>
    </div>
  )
}
