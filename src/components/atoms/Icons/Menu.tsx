const MenuIcon = () => {
  return (
    <>
      <style jsx>{`
        .hamburger {
          position: relative;
          width: 30px;
          height: 20px;
        }
        .line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--accent-color);
        }
        .top {
          top: 0;
        }
        .middle {
          top: 50%;
          transform: translateY(-50%);
        }
        .top {
          top: 100%;
        }
      `}</style>
      <div className="hamburger">
        <div className="line top"></div>
        <div className="line middle"></div>
        <div className="line bottom"></div>
      </div>
    </>
  )
}

export default MenuIcon