interface Props {
  children: React.ReactNode
  duration?: string
  delay?: string
  timingFunction?: string
  direction?: string
}
const FadeIn = ({children, duration, delay, timingFunction, direction}: Props) => {
  const style: React.CSSProperties = {
    animationDuration: duration,
    animationDelay: delay,
    animationTimingFunction: timingFunction,
    animationDirection: direction
  }
  return (
    <div className='fadeIn' style={style}>
      {children}
    </div>
  )
}

export default FadeIn