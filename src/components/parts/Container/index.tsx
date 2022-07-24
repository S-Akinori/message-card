import { CommonProps } from "src/types/CommonProps"

interface Props extends CommonProps {
  children: React.ReactNode
}

const Container = ({children, className = '', style}: Props) => {
  return  (
    <div className={`container mx-auto px-6 ${className}`} style={style}>{children}</div>
  )
}

export default Container