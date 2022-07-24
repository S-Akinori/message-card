interface Props {
  color? : string
}
const CloseIcon = ({color}: Props) => {
  return (
    <>
      <style jsx>{`
        .wrapper {
          position: relative;
          display: block;
          width: 30px;
          height: 30px;
        }
        .line {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          background: ${color || `var(--base-text-color)`};
          width: 100%;
          height: 1px;
        }
        .line1 {
          transform: translate(-50%, -50%) rotate(45deg);
        }
        .line2 {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      `}</style>
      <div className="wrapper">
        <div className="line line1"></div>
        <div className="line line2"></div>
      </div>
    </>
  )
}

export default CloseIcon