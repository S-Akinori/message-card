import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from 'src/components/atoms/Button'
import Container from 'src/components/parts/Container'
import Layout from 'src/components/templates/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Container className='py-12'>
        <div className='text-center'>
          思いをメッセージカードに<br />
          ツタエール
        </div>
        <div className='py-4'>
          結婚式で人生のパートナーに<br />
          卒業式で一緒に過ごしてきた親友に<br />
          成人式で今まで育ててくれた両親に<br />
        </div>
        <div>
          オンラインですべて完結。作ったデータをLINEやメール、インスタで送るだけ！<br />
          さっそく思いを伝えよう  
        </div>

        <Button href="/letter/">メッセージカードを見る</Button>
      </Container>
    </Layout>
  )
}

export default Home
