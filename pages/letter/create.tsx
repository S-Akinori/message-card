import { MouseEventHandler } from "react"
import BoxOpen from "src/components/pages/BoxOpen"
import Layout from "src/components/templates/Layout"

const LetterCreatePage = () => {
  const onClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const res = await fetch("http://localhost:3000/letter/create");
    const data = await res.json();
    console.log(data)
  }
  return (
    <Layout>
      <BoxOpen />
      <button onClick={onClick}>ダウンロード</button>
    </Layout>
  )
}

export default LetterCreatePage