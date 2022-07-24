import { GetStaticPaths, GetStaticProps } from "next"
import React from "react"
import LetterShowLayout from "src/components/templates/Layout/LetterShowLayout"
import { letters } from "src/contents/letters"
import { fetchLetterContent } from "src/lib/fetchLetterContent"
import { fetchLetterTemplate } from "src/lib/fetchLetterTemplate"

interface Props {
  id: string
}

const LetterShowPage = ({id}: Props) => {
  const letter = fetchLetterContent(id);
  const template = fetchLetterTemplate(letter.templateId);

  return (
    <LetterShowLayout>
      <template.component props={letter} />
    </LetterShowLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = letters.map((letter) => ({
    params: { id: letter.id },
  }));
  
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const id = params?.id as string;
  //今後firestoreを使うとき取得
  return {
    props: {
      id
    }
  }
}


export default LetterShowPage;