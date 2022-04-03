import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Anime Page</title>
      </Head>

      <main id='homePage'>
        <h1 id='headHome'>Welcome to my Anime Page</h1>
        <div id='heroImg'>
          <Image
            src="/background.jpg"
            alt="Hero Image"
            width={1400}
            height={500}
          />
        </div>
      </main>
    </div>
  )
}
