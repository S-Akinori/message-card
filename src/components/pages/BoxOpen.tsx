import { Canvas } from "@react-three/fiber"
import Container from "src/components/parts/Container"
import Layout from "src/components/templates/Layout"
import Cube from 'src/components/parts/threejs/Cube'
import { Suspense, useState } from "react"
import Text from "src/components/parts/threejs/Text"
import { useSpring, animated, config } from "react-spring"
import Image from "next/image"

const BoxOpen = () => {
  const [clicked, setClicked] = useState(false);
  
  const dynamicFadeIn = useSpring({
    from: {
      opacity: 0,
      scale: 0,
      x: "-50%",
      top: "50%"
    },
    to: {
      opacity: 1,
      scale: 1,
      x: "-50%",
      top: "15%"
    },
    delay: 1000,
    pause: !clicked,
  })

  const floatAnim = useSpring({
    from: {
      y: 0,
    },
    to: {
      y: 50,
    },
    loop: {
      reverse: true,
    },
    config: {
      mass: 10,
      tension: 100,
      friction: 120 
    }
  })

  const styleAlert = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    loop: { reverse: true },
    delay: 500,
  })

  const onClick = () => {
    setClicked(true);
  }

  return (
      <>
        <Canvas camera={{rotation: [-Math.PI / 6,0,0], position: [0, 2, 5]}}>
          <Suspense fallback={null}>
            <color attach="background" args={[0xf5f3fd]} />
            <ambientLight intensity={0.5} />
            <directionalLight intensity={0.5} position={[-10, 10, 10]} />
            <Cube onClick={onClick} rotation={[0, - Math.PI / 6, 0]} position={[0,-1,0]} />
            {/* <Text font="/fonts/NotoSansJP-Regular.otf" fontSize={1} color="black" anchorX="center" anchorY="middle">
              おめでとう！
            </Text> */}
          </Suspense>
        </Canvas>
        {!clicked && 
          <animated.div className="absolute top-1/4 text-2xl font-bold w-full text-center" style={styleAlert}>
            クリックしてね！
          </animated.div>
        }
        <animated.div className="w-full font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style={dynamicFadeIn}>
          <animated.div style={floatAnim} className="absolute -top-full left-0 text-center">
            <div className="w-44 h-44 md:w-80 md:h-80">
              <Image
                className="rounded-full"
                src="/images/wedding.jpg"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </animated.div>
          <animated.div style={floatAnim} className="absolute -top-full right-0  text-center">
          <div className="w-44 h-44 md:w-80 md:h-80">
            <Image
              className="rounded-full"
              src="/images/wedding1.jpg"
              layout="fill"
              objectFit="cover"
            />
            </div>
          </animated.div>
          <animated.div style={floatAnim} className="relative -bottom-24 text-center text-xl md:text-3xl">
            吉高由里子ちゃんへ！<br />
            いつもかわいいのありがと！<br />
            これからもよろしく！
          </animated.div>
        </animated.div>
      </>
  )
}

export default BoxOpen