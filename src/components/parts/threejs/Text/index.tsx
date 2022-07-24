import { CommonProps } from "src/types/CommonProps";

interface Props extends CommonProps {
  children: React.ReactNode;
}

const Text = ({children, className, style}: Props) => {
  return (
    <div className={`Text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`} style={style}>
      {children}
    </div>
  )
}
export default Text;