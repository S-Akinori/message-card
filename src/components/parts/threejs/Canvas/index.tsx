import * as React from "react";

interface Props {
  children: React.ReactNode
}

const Canvas = ({children}: Props) => {
  return (
    <canvas>
      {children}
    </canvas>
  );
};

export default Canvas;