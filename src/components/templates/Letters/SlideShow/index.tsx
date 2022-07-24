import Image from "next/image"
import { useEffect, useState } from "react"
import { useSpring, useSprings, animated, config, useTransition} from "react-spring"
import { CommonProps } from "src/types/CommonProps"

interface Props extends CommonProps {
  props: {
    id: string,
    templateId: string
    images: {
      id: string
      src: string
    }[]
    text: JSX.Element
  }
}

const SlideShow = ({props}: Props) => {
  const [index, setIndex] = useState(0);
  const transitions = useTransition(index, {
    key: index,
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
    config: {duration: 2000},
    onRest: (_a, _b, item) => {
      if(index === item) {
        setTimeout(() => {
          setIndex(state => (state + 1) % props.images.length)
        }, 3000)
      }
    },
    // exitBeforeEnter: true
  })
  return (
    <div className="">
      <div className="">
        {transitions((style, i) => (
          <animated.div key={i} className={`absolute w-full h-full`} style={style}>
            <Image
              src={props.images[i].src}
              layout="fill"
              objectFit="cover"
            />
          </animated.div>
        ))}
      </div>
      <div className="absolute absolute-center p-4 whitespace-pre-wrap w-full md:w-1/2" style={{background: "rgba(var(--main-color-rgb), 0.6)"}}>{props.text}</div>
    </div>
  )
}

export default SlideShow