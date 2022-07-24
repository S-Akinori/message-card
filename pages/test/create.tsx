import React,  { useEffect, useRef, useState } from "react";
import Button from "src/components/atoms/Button"
import Container from "src/components/parts/Container"
import Layout from "src/components/templates/Layout"
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Text from "src/components/parts/threejs/Text";
import Circle from "src/components/parts/threejs/Circle";
import BackgroundCircles from "src/components/parts/threejs/BackgroundCircles";
import Image from "next/image";
import BackgroundImages from "src/components/templates/Letters/SlideShow";
import {convertToRaw, Editor, EditorState, RichUtils} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';
import { FadeIn } from "src/components/parts/Animation";


const images = [
  {
    id: 'wedding.jpg',
    src: '/images/wedding.jpg',
    top: '0',
    left: '0',
    width: 150,
    height: 200,
    cover: true,
  },
  {
    id: 'wedding1.jpg',
    src: '/images/wedding1.jpg',
    bottom: '0',
    right: '0',
    width: 150,
    height: 200,
    cover: true,
  }
]

interface TextData {
  id?: string
  text?: string
  type?: 'h1' | 'h2' | 'normal'
  style?: React.CSSProperties
  position?: {
    top?: string
    left?: string
  }
  animation?: {
    name: string
    duration?: number
    delay?: number
    timingFunction?: string
    fillMode?: string
    iterationCount?: string
    direction?: string
  }
}

const textComponents: TextData[] = [
  {
    id: '6ymj4pw',
    text: 'サンプルテキスト',
    type: 'h1',
    style: {
      position: 'absolute',
      fontSize: 32,
      fontWeight: 'bold',
      // transform: 'translate(100px, 100px)',
      top: '100px',
      left: '100px',
    },
    position: {
      top : '50%',
      left : '50%'
    },
  },
  {
    id: 'xvzm7fe',
    text: 'サンプルテキスト',
    type: 'h2',
    style: {
      position: 'absolute',
      fontSize: 24,
      fontWeight: 'normal',
      top : '50%',
      left : '50%'
    },
    position: {
      top : '50%',
      left : '50%'
    },
  },
  {
    id: 'adg9owf',
    text: 'サンプルテキスト',
    type: 'normal',
    style: {
      position: 'absolute',
      fontSize: 16,
      fontWeight: 'normal',
      top : '50%',
      left : '50%'
    },
    position: {
      top : '50%',
      left : '50%'
    },
  },
]

const defaultTextData: TextData[] = [
  {
    id: '6ymj4pw',
    text: 'サンプルテキスト',
    type: 'h1',
    style: {
      position: 'absolute',
      fontSize: 32,
      fontWeight: 'bold',
      top: '230px',
      left: '40px',
    },
  },
  {
    id: 'adg9owf',
    text: 'サンプルテキスト',
    type: 'normal',
    style: {
      position: 'absolute',
      fontSize: 16,
      fontWeight: 'normal',
      top: '300px',
      left: '40px',
    },
  },
]

const LetterCreatePageTest = () => {
  const [textData, setTextData] = useState<TextData[]>(defaultTextData)
  const [draggable, setDraggable] = useState(false)
  const [offset, setOffset] = useState([0,0])
  const [draggedItem, setDraggedItem] = useState<HTMLDivElement | null>(null);
  const [isCanvas, setIsCanvas] = useState(false)
  const [canvasSize, setCanvasSize] = useState({width: '375px', height: '667px'})
  const canvasContainer = useRef<HTMLDivElement>(null!)

  const onClick = (data: TextData) => {
    const id = Math.random().toString(32).substring(2)
    data.id = id
    setTextData([...textData, data])
  }

  const onBlur: React.FormEventHandler<HTMLDivElement> = (e) => {
    const text = e.currentTarget.innerText
    const id = e.currentTarget.id;
    const data = textData.map(item => (
      item.id === id ? {...item, text: text} : {...item}
    )) as TextData[]
    setTextData(data)
    e.currentTarget.setAttribute('contentEditable', 'false')
    e.currentTarget.style.cursor = 'grab'
  }

  const activateEdit: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.setAttribute('contentEditable', 'true')
    e.currentTarget.style.cursor = 'auto'
  }

  const setMousePosition : React.MouseEventHandler<HTMLDivElement> = (e) => {
    if(draggable && draggedItem) {
      
      const pageX = e.pageX
      const pageY = e.pageY
  
      const clientRect = e.currentTarget.getBoundingClientRect();
      const posX = clientRect.left + window.scrollX
      const posY = clientRect.top + window.scrollY
  
      const x = pageX - posX
      const y = pageY - posY
  
      const position = {
        top: y - offset[1],
        left: x - offset[0]
      }
      draggedItem.style.top = `${position.top}px`
      draggedItem.style.left = `${position.left}px`
    }
  }

  const dragStart: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setDraggable(true)
    setDraggedItem(e.currentTarget)

    const pageX = e.pageX
    const pageY = e.pageY

    const clientRect = e.currentTarget.getBoundingClientRect();
    const posX = clientRect.left + window.scrollX
    const posY = clientRect.top + window.scrollY

    const x = pageX - posX
    const y = pageY - posY
    setOffset([x,y])
  }

  const dragEnd: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setDraggable(false)
    setDraggedItem(null)

    const top = e.currentTarget.style.top
    const left = e.currentTarget.style.left
    const id = e.currentTarget.id;
    const data = textData.map(item => (
      item.id === id ? {...item, style: {...item.style, top: top, left: left}} : {...item}
    )) as TextData[]
    setTextData(data)
  }

  // useEffect(() => {
  //   const canvasWidth = canvasContainer.current?.clientWidth
  //   const canvasHeight = canvasWidth * 9 / 16
  //   setHeight(canvasHeight)
  // }, [])

  return (
    <Layout>
      <Container className="py-12">
        <div className="mb-8">
          <div className="text-xl mb-4">デザインを決めよう</div>
          <div>テンプレ一覧をここに。チェックボックスで</div>
        </div>
        <div className="mb-8">
          <div>テキストを生成</div>
          <div>
            <div className="cursor-pointer w-max" style={{fontSize: '32px'}} onClick={() => onClick(textComponents[0])}>サンプルテキスト</div>
            <div className="cursor-pointer w-max" style={{fontSize: '24px'}} onClick={() => onClick(textComponents[1])}>サンプルテキスト</div>
            <div className="cursor-pointer w-max" onClick={() => onClick(textComponents[2])}>サンプルテキスト</div>
          </div>
        </div>
        <div 
          ref={canvasContainer}
          className="mx-auto border border-main overflow-hidden" 
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
          }}
          onMouseDown={setMousePosition}
          onMouseMove={setMousePosition}
        >
        {isCanvas && 
          <Canvas>
            <pointLight position={[10, 10, 10]} />
            <BackgroundCircles />
            <Text>サンプルテキスト</Text>
          </Canvas>
        }
        {!isCanvas && 
          <BackgroundImages images={images}>
            {textData && textData.map(textItem => (
              <FadeIn
                key={textItem.id}
                delay="3s"
              >
                <div 
                    style={textItem.style}
                    id={textItem.id}
                    className={`whitespace-pre-wrap cursor-grab`}
                    suppressContentEditableWarning
                    onBlur={onBlur}
                    onDoubleClick={activateEdit}
                    onMouseDown={dragStart}
                    onMouseUp={dragEnd}
                  >
                    {textItem.text}
                  </div>
              </FadeIn>
            ))}
          </BackgroundImages>
        }
        </div>
        <div className="text-center"><Button>保存</Button></div>
      </Container>
    </Layout>
  )
}

export default LetterCreatePageTest