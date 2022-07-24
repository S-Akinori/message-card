import Head from "next/head"
import React from "react"
import Footer from "../../parts/Footer"
import Header from "../../parts/Header"

interface Props {
  children: React.ReactNode
  pageTitle?: string,
  pageDescription?: string
  pagePath?: string
  pageImg?: string
}

const LetterShowLayout = ({
    pageTitle = process.env.NEXT_PUBLIC_SITE_NAME, 
    pageDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    pagePath = process.env.NEXT_PUBLIC_HOME_URL, 
    pageImg = 'https://impre.jp/images/agriculture-gf0d64886b_1920.jpg', 
    children
  }: Props) => {
  return (
    <div style={{overflowX: 'hidden'}}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{pageTitle}</title>
        {process.env.NEXT_PUBLIC_ENV !== 'production' && <meta name="robots" content="noindex, nofollow" />}
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pagePath} />
        <meta property="og:image" content={pageImg} />
        <meta property="og:site_name" content={pageTitle} />
        <meta property="og:locale" content="ja_JP"  />
      </Head>
      <main className="py-0">
        <div className="bg-main relative" style={{height: "100vh"}}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default LetterShowLayout