import Link from "next/link";
import Layout from "src/components/templates/Layout";
import { letters } from "src/contents/letters";
import { fetchLetterTemplate } from "src/lib/fetchLetterTemplate";

const LetterPage = () => {
  return (
    <Layout>
      <div className="py-12">
        <h2 className="text-center mb-12">メッセージカード一覧</h2>
        <div className="flex">
          {letters.map((letter, index) => {
            const template = fetchLetterTemplate(letter.templateId);
            return (
              <div key={letter.id} className="relative p-4 md:w-1/2 lg:w-1/3 h-80">
                <Link href={`/letter/${letter.id}`}><a className="absolute top-0 left-0 block w-full h-full"></a></Link>
                    <iframe src={`/letter/${letter.id}`} className="w-full h-full" />
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default LetterPage;