import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { media } from "src/contents/common"
import { CommonProps } from "src/types/CommonProps"
import Button from "src/components/atoms/Button"
import CloseIcon from "src/components/atoms/Icons/Close"

interface Props extends CommonProps {
  nav: {
    id: string
    href: string
    linkText: string
  }[]
  open? : boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean | undefined>>
}
const NavSP = ({nav, open, setOpen, className = '', style}: Props) => {
  const [animation, setAnimation] = useState('');
  const [animClass, setAnimClass] = useState('hidden')
  useEffect(() => {
    if(open === true) {
      setAnimation('fadeIn')
      setAnimClass('block')
    } else if(open === false) {
      setAnimation('fadeOut')
      setTimeout(() => {
        setAnimClass('hidden')
      }, 300)
    }
  })
  return (
    <>
    <div className={`fixed top-0 right-0 px-8 w-full h-full overflow-hidden bg-main ${animClass} ${animation} ${className}`} style={style}>
      <div className="absolute right-4 top-4 cursor-pointer" onClick={setOpen ? () => setOpen(false) : undefined}><CloseIcon /></div>
      <div className="flex flex-col justify-center h-5/6">
        <nav className="mb-4" style={style}>
          <ul className="w-max mx-auto">
            {nav && nav.map(navItem => (
              <li key={navItem.id} className="px-4"><Link href={navItem.href}>{navItem.linkText}</Link></li>
            ))}
          </ul>
        </nav>
        <div className='pr-2 mb-4 text-center'><Button href="/contact">お問い合わせ</Button></div>
        <div className='pr-2 mb-4 text-center'><Button href="/contact/order">お申込み</Button></div>
        <div className="flex justify-center mb-4">
          {media && media.map(item => (
            <div key={item.id} className="pr-4"><a href={item.href} target="_blank" rel="noreferrer">
              <Image
                src={item.src}
                width={40}
                height={40}
                alt={item.linkText}
              />
            </a></div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default NavSP