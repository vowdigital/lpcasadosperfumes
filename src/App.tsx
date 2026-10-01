import { forwardRef, useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode, type RefObject } from 'react'
import aventusImage from '../img/creed-aventus.webp'
import hacivatImage from '../img/nishane-hacivat.webp'
import sabahImage from '../img/sabah-al-ward.webp'
import fuegoImage from '../img/club-de-nuit-intenso-fuego.webp'
import cocoImage from '../img/coco-mademoiselle-crush-absolu.webp'
import logoImage from '../img/logo-casa-dos-perfumes.webp'

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/C7OJBwO7TMtKRoO5VGaHV6?s=cl&p=a&ilr=4&iam=1'

type CtaPosition = 'header' | 'hero' | 'final' | 'sticky'

type Product = {
  name: string
  brand: string
  category: string
  image: string
  alt: string
}

const products: Product[] = [
  { name: 'Aventus', brand: 'Creed', category: 'Ícone da perfumaria', image: aventusImage, alt: 'Perfume Creed Aventus e sua embalagem' },
  { name: 'Hacivat', brand: 'Nishane', category: 'Perfumaria de nicho', image: hacivatImage, alt: 'Perfume Nishane Hacivat e sua embalagem' },
  { name: 'Sabah Al Ward', brand: 'Al Wataniah', category: 'Perfume árabe', image: sabahImage, alt: 'Perfume Al Wataniah Sabah Al Ward e sua embalagem' },
  { name: 'Club de Nuit Intenso Fuego', brand: 'Armaf', category: 'Seleção especial', image: fuegoImage, alt: 'Perfume Armaf Club de Nuit Intenso Fuego e sua embalagem' },
  { name: 'Coco Mademoiselle Crush Absolu', brand: 'Chanel', category: 'Decant', image: cocoImage, alt: 'Decant de Chanel Coco Mademoiselle Crush Absolu' },
]

function trackCta(position: CtaPosition) {
  try {
    window.fbq?.('track', 'Lead', { content_name: 'Grupo VIP WhatsApp', position })
  } catch {
    // A análise não pode impedir a navegação.
  }

  try {
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push({ event: 'clique_grupo_vip', cta_posicao: position })
  } catch {
    // O GTM é opcional.
  }
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.9.9-2.99-.2-.31a8.2 8.2 0 1 1 6.85 3.73zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.76 2.76 0 0 0-.86 2.05c0 1.21.88 2.38 1 2.55.12.16 1.73 2.64 4.2 3.7 1.56.67 2.17.73 2.95.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 10h12M10.5 5l5 5-5 5" />
    </svg>
  )
}

type CtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  position: CtaPosition
  children: ReactNode
}

const CtaLink = forwardRef<HTMLAnchorElement, CtaLinkProps>(function CtaLink(
  { position, children, className = '', onClick, ...props },
  ref,
) {
  return (
    <a
      {...props}
      ref={ref}
      href={WHATSAPP_GROUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta ${className}`}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) trackCta(position)
      }}
    >
      {children}
      <ArrowIcon />
    </a>
  )
})

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand-link" href="https://casadosperfumesimportados.com.br/" aria-label="Casa dos Perfumes Importados — página inicial">
          <img src={logoImage} alt="Casa dos Perfumes Importados" width="210" height="79" />
        </a>
        <div className="header-actions">
          <span className="header-note">Seu convite para o extraordinário</span>
          <CtaLink position="header" className="header-cta">Entrar no grupo</CtaLink>
        </div>
      </div>
    </header>
  )
}

function Hero({ ctaRef }: { ctaRef: RefObject<HTMLAnchorElement | null> }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow eyebrow--light"><span /> Casa dos Perfumes apresenta</p>
          <h1 id="hero-title">O privilégio de <em>descobrir primeiro.</em></h1>
          <p className="hero-description">Uma seleção de perfumes especiais, ofertas exclusivas e novidades em primeira mão. Tudo em um só lugar: nosso Grupo VIP.</p>
          <CtaLink ref={ctaRef} position="hero" className="hero-cta"><WhatsAppIcon /> Quero fazer parte do Grupo VIP</CtaLink>
          <p className="hero-footnote">Acesso gratuito <span aria-hidden="true">•</span> Diretamente no WhatsApp</p>
        </div>

        <div className="hero-art" aria-label="Seleção de perfumes da Casa dos Perfumes Importados">
          <div className="hero-art-frame">
            <span className="hero-art-index">01 / Uma curadoria especial</span>
            <div className="hero-product hero-product--main">
              <img src={aventusImage} alt="Creed Aventus" fetchPriority="high" />
            </div>
            <div className="hero-product hero-product--secondary">
              <img src={hacivatImage} alt="Nishane Hacivat" fetchPriority="high" />
            </div>
            <div className="hero-art-caption"><span>FRAGRÂNCIAS QUE MARCAM</span><span>CASA DOS PERFUMES</span></div>
          </div>
          <span className="hero-art-orbit" aria-hidden="true" />
        </div>
      </div>
      <div className="hero-bottom-line" aria-hidden="true" />
    </section>
  )
}

function ValueStrip() {
  return (
    <div className="value-strip">
      <div className="container value-strip-inner">
        <p>Seleção especial de perfumes importados</p>
        <span aria-hidden="true" />
        <p>Novidades em primeira mão</p>
        <span aria-hidden="true" />
        <p>Um convite gratuito</p>
      </div>
    </div>
  )
}

function ProductShelf() {
  return (
    <section className="collection section-space" id="colecao" aria-labelledby="collection-title">
      <div className="container">
        <div className="section-heading collection-heading">
          <div>
            <p className="eyebrow"><span /> A coleção</p>
            <h2 id="collection-title">Dos clássicos aos <em>inesperados.</em></h2>
          </div>
          <p>Explore alguns dos perfumes que fazem parte do universo da Casa dos Perfumes Importados.</p>
        </div>
        <ul className="product-grid">
          {products.map((product, index) => (
            <li className="product-card" key={product.name}>
              <div className="product-image-wrap">
                <span className="product-number">0{index + 1}</span>
                <img src={product.image} alt={product.alt} loading="lazy" />
                <span className="product-category">{product.category}</span>
              </div>
              <div className="product-details">
                <span>{product.brand}</span>
                <h3>{product.name}</h3>
              </div>
            </li>
          ))}
        </ul>
        <p className="collection-note">Uma amostra do que você encontra por aqui. As ofertas disponíveis são compartilhadas no grupo.</p>
      </div>
    </section>
  )
}

const benefits = [
  { number: '01', title: 'Ofertas em primeira mão', description: 'Receba as oportunidades antes de todo mundo, diretamente no seu WhatsApp.' },
  { number: '02', title: 'Seleção especial', description: 'Descubra perfumes importados, fragrâncias de nicho e achados para a sua coleção.' },
  { number: '03', title: 'Sem custo para entrar', description: 'O acesso ao grupo é gratuito. Participe e acompanhe as novidades no seu tempo.' },
]

function Benefits() {
  return (
    <section className="benefits section-space" aria-labelledby="benefits-title">
      <div className="container benefits-layout">
        <div className="benefits-intro">
          <p className="eyebrow"><span /> Mais perto do que você ama</p>
          <h2 id="benefits-title">O melhor acontece <em>antes.</em></h2>
          <p>O Grupo VIP foi criado para quem gosta de descobrir uma boa oportunidade no momento certo.</p>
          <div className="benefits-monogram" aria-hidden="true">CP</div>
        </div>
        <ol className="benefits-list">
          {benefits.map((benefit) => (
            <li key={benefit.number}>
              <span className="benefit-number">{benefit.number}</span>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
              <ArrowIcon />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function FinalCta({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  return (
    <section ref={sectionRef} className="final-cta section-space" aria-labelledby="final-title">
      <div className="container final-layout">
        <div className="final-visual" aria-hidden="true">
          <div className="final-visual-border" />
          <img src={sabahImage} alt="" loading="lazy" />
          <span>Um novo favorito pode estar a uma mensagem de distância.</span>
        </div>
        <div className="final-copy">
          <p className="eyebrow eyebrow--light"><span /> O convite está feito</p>
          <h2 id="final-title">Seu próximo perfume começa <em>por aqui.</em></h2>
          <p>Entre para o Grupo VIP e acompanhe ofertas exclusivas e novidades da Casa dos Perfumes Importados.</p>
          <CtaLink position="final" className="final-button"><WhatsAppIcon /> Entrar no Grupo VIP</CtaLink>
          <small>Gratuito para participar. Saia quando quiser.</small>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="https://casadosperfumesimportados.com.br/" aria-label="Visitar Casa dos Perfumes Importados">
              <img src={logoImage} alt="Casa dos Perfumes Importados" width="174" height="65" loading="lazy" />
            </a>
            <p>Perfumes que fazem parte da sua história.</p>
          </div>

          <div className="footer-column">
            <h2>Contato</h2>
            <ul>
              <li><a href="https://wa.me/5511967384129" target="_blank" rel="noopener noreferrer">5511967384129</a></li>
              <li><a href="tel:+5511926213297">11 926213297</a></li>
              <li><a href="mailto:vendas@casadosperfumesimportados.com.br">vendas@casadosperfumesimportados.com.br</a></li>
              <li>Caixa Postal 75418 - São Paulo - CEP 04132971</li>
              <li><a href="https://casadosperfumesimportados.com.br/blog/" target="_blank" rel="noopener noreferrer">Visite o nosso Blog!</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Casa dos Perfumes Importados</p>
          <a className="footer-store-link" href="https://casadosperfumesimportados.com.br/" target="_blank" rel="noopener noreferrer">Visitar a loja <ArrowIcon /></a>
        </div>
      </div>
    </footer>
  )
}

function StickyCta({ heroCtaRef, finalSectionRef }: { heroCtaRef: RefObject<HTMLAnchorElement | null>; finalSectionRef: RefObject<HTMLElement | null> }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const heroCta = heroCtaRef.current
    const finalSection = finalSectionRef.current
    if (!heroCta || !finalSection || !('IntersectionObserver' in window)) return

    let heroVisible = true
    let finalVisible = false
    const update = () => setVisible(!heroVisible && !finalVisible)
    const options = { threshold: 0.1 }
    const heroObserver = new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; update() }, options)
    const finalObserver = new IntersectionObserver(([entry]) => { finalVisible = entry.isIntersecting; update() }, options)

    heroObserver.observe(heroCta)
    finalObserver.observe(finalSection)
    return () => { heroObserver.disconnect(); finalObserver.disconnect() }
  }, [heroCtaRef, finalSectionRef])

  return (
    <div className={`sticky-cta ${visible ? 'sticky-cta--visible' : ''}`} aria-hidden={!visible}>
      <CtaLink position="sticky" tabIndex={visible ? 0 : -1}><WhatsAppIcon /> Entrar no Grupo VIP</CtaLink>
    </div>
  )
}

export default function App() {
  const heroCtaRef = useRef<HTMLAnchorElement>(null)
  const finalSectionRef = useRef<HTMLElement>(null)

  return (
    <>
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <Header />
      <main id="main-content">
        <Hero ctaRef={heroCtaRef} />
        <ValueStrip />
        <ProductShelf />
        <Benefits />
        <FinalCta sectionRef={finalSectionRef} />
      </main>
      <Footer />
      <StickyCta heroCtaRef={heroCtaRef} finalSectionRef={finalSectionRef} />
    </>
  )
}
