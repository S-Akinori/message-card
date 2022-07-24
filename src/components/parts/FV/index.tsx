import Image from 'next/image';
import validateImage from 'src/lib/validateImage';
import validateVideo from 'src/lib/validateVideo';

interface Props {
  en?: string
  title?: string
  text?: string
  src: string
}

const FV = ({en, title, text, src}: Props) => {
  let fileType = '';
  if(validateImage(src)) {
    fileType = 'image'
  } else if(validateVideo(src)) {
    fileType = 'video'
  }

  return (
    <>
      <style jsx>{`
        .fv-container {
          position: relative;
          height: 50vh;
          overflow: hidden;
        }
        .fv-container::before {
          content: '';
          display: block;
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--base-text-color);
          opacity: 0.4;
        }
      `}</style>
      <div className="fv-container">
        <div className="text-center">
          {fileType == 'image' && <Image src={src} layout="fill" objectFit='cover' objectPosition="center center" />}
          {fileType == 'video' && <video src={src} autoPlay loop muted className={`md:h-screen object-cover object-center`}></video>}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          {en && <div className='font_en text-base-color'>{en}</div>}
          {title && <h2 className={`relative text-base-color leading-loose text-xl text-4xl`}>{title}</h2>}
          {text && <div className={`relative pl-16 text-base-color`}>{text}</div>}
        </div>
      </div>
    </>
  )
}

export default FV;