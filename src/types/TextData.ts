export interface TextData {
  id: string
  text?: string
  type?: string
  style?: React.CSSProperties
  draggable?: boolean
  position?: {
    top?: string
    left?: string
  }
  AnimationName?: (props: any) => JSX.Element
  animation?: {
    duration?: string
    delay?: string
    timingFunction?: string
    fillMode?: string
    iterationCount?: string
    direction?: string
  }
  texts: {
    id: string,
    text?: string,
    type?: string,
    draggable?: boolean,
    style?: React.CSSProperties,
    AnimationName?: (props: any) => JSX.Element
    animation?: {
      duration?: string
      delay?: string
      timingFunction?: string
      fillMode?: string
      iterationCount?: string
      direction?: string
    }
  }[]
}