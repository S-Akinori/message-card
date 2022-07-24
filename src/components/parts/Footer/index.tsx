import Image from "next/image";
import Button from "src/components/atoms/Button";
import Container from "src/components/parts/Container";
import Nav from "src/components/parts/Nav";
import { company, media } from "src/contents/common";
import { fnav } from "src/contents/footer";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-main bg-main w-full">
      <Container className="mb-8 w-max text-center md:w-auto md:text-left">
        <div className="flex justify-between">
          <div>{process.env.NEXT_PUBLIC_SITE_NAME}</div>
          <div>
            {/* <div className="mb-4">{company.address}</div> */}
            <div className="flex justify-center mb-4 md:justify-start">
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
            <div><Button href="/contact">お問い合わせはこちら</Button></div>
          </div>
        </div>
      </Container>
      <Container className="mb-8">
          <Nav nav={fnav} />
      </Container>
      <Container>
        <div className="text-sm text-center">&copy; 2022 {process.env.NEXT_PUBLIC_SITE_NAME}</div>
      </Container>
    </footer>
  )
}

export default Footer;