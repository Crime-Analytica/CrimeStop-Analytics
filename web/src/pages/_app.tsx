import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  
  return(<><Component {...pageProps} /><Head>
    <meta charSet="UTF-8" />
    <meta name="keywords" content="CrimeStop-Analytics, Crime Analysis, CrimeStop, Jamaica" />
    <meta name="author" content="Garret Tomlin" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="og:image" content="https://res.cloudinary.com/dwhs4luwi/image/upload/v1681147022/icon_tsvzxl.png"/>
  </Head></>
  
  )
}
