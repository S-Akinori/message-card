import Link from "next/link"
import { CommonProps } from "src/types/CommonProps"

interface Props extends CommonProps {
  nav: {
    id: string
    href: string
    linkText: string
  }[]
}
const Nav = ({nav, className, style}: Props) => {
  return (
    <nav className={className} style={style}>
      <ul className="flex justify-center flex-wrap">
        {nav && nav.map(navItem => (
          <li key={navItem.id} className="px-2 before:hidden"><Link href={navItem.href}>{navItem.linkText}</Link></li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav