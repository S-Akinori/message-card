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
import { TextData } from "src/types/TextData";
import { templates } from "src/contents/templates";
import { Template } from "src/types/Template";
import findObjectById from "src/lib/findObjectById";
import { text } from "stream/consumers";

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
      fontSize: 24,
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

const LetterCreatePage = () => {
  const [textData, setTextData] = useState<TextData[]>(defaultTextData)
  const [draggable, setDraggable] = useState(false)
  const [offset, setOffset] = useState([0,0])
  const [draggedItem, setDraggedItem] = useState<HTMLDivElement | null>(null);
  const [isCanvas, setIsCanvas] = useState(false)
  const [template, setTemplate] = useState<Template | null>(null)
  const [canvasSize, setCanvasSize] = useState({width: '375px', height: '667px'})
  const canvasContainer = useRef<HTMLDivElement>(null!)

  // const onClick = (data: TextData) => {
  //   const id = Math.random().toString(32).substring(2)
  //   data.id = id
  //   setTextData([...textData, data])
  // }

  console.log(template)

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
    if(!template) return

    const textItem = findObjectById(template?.textData, e.currentTarget.id)

    if(!textItem?.draggable) return;
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

  return (
    <Layout>
      <Container className="py-12">
        <div className="mb-8">
          <div className="text-xl mb-4">デザインを決めよう</div>
          <div className="flex">
            {templates && templates.map(template => (
              <div id={template.id} key={template.id} className="p-4 w-1/2 cursor-pointer md:w-1/5" onClick={() => setTemplate(findObjectById(templates, template.id))}>
                背景画像
                <Image 
                  src="/images/image-background.png"
                  width={375}
                  height={667}
                />
              </div>
            ))}
          </div>
        </div>
        {/* <div className="mb-8">
          <div>テキストを生成</div>
          <div>
            <div className="cursor-pointer w-max" style={{fontSize: '32px'}} onClick={() => onClick(textComponents[0])}>サンプルテキスト</div>
            <div className="cursor-pointer w-max" style={{fontSize: '24px'}} onClick={() => onClick(textComponents[1])}>サンプルテキスト</div>
            <div className="cursor-pointer w-max" onClick={() => onClick(textComponents[2])}>サンプルテキスト</div>
          </div>
        </div> */}
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
          {template && (
            <template.component images={template.images}>
                {template.textData && template.textData.map((textItem) => (
                  <>
                    {textItem.AnimationName && (
                      <textItem.AnimationName
                        key={textItem.id}
                        delay={textItem.animation?.delay}
                      >
                        <div 
                          style={textItem.style}
                          id={textItem.id}
                          className={`whitespace-pre-wrap ${textItem.draggable ? 'cursor-grab' : ''}`}
                          suppressContentEditableWarning
                          onBlur={onBlur}
                          onDoubleClick={activateEdit}
                          onMouseDown={dragStart}
                          onMouseUp={dragEnd}
                        >
                          {textItem.text}
                        </div>
                      </textItem.AnimationName>
                    )}
                    {!textItem.AnimationName && (
                      <div 
                        key={textItem.id}
                        style={textItem.style}
                        id={textItem.id}
                        className={`whitespace-pre-wrap ${textItem.draggable ? 'cursor-grab' : ''}`}
                        suppressContentEditableWarning
                        onBlur={onBlur}
                        onDoubleClick={activateEdit}
                        onMouseDown={dragStart}
                        onMouseUp={dragEnd}
                      >
                        {textItem.text}
                      </div>
                    )}
                  </>
                ))}
            </template.component>
          )}
        </div>
        <div className="text-center"><Button>保存</Button></div>
      </Container>
    </Layout>
  )
}

export default LetterCreatePage