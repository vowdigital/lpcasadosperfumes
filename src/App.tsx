import { forwardRef, useEffect, useLayoutEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode, type RefObject } from 'react'
import { gsap } from 'gsap'
import aventusImage from '../img/creed-aventus.webp'
import hacivatImage from '../img/nishane-hacivat.webp'
import sabahImage from '../img/sabah-al-ward.webp'
import fuegoImage from '../img/club-de-nuit-intenso-fuego.webp'
import cocoImage from '../img/coco-mademoiselle-crush-absolu.webp'
import logoImage from '../img/logo-casa-dos-perfumes.webp'

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/C7OJBwO7TMtKRoO5VGaHV6?s=cl&p=a&ilr=4&iam=1'

type CtaPosition = 'hero' | 'final' | 'sticky'

type Product = {
  name: string
  brand: string
  image: string
  alt: string
}

const products: Product[] = [
  { name: 'Aventus', brand: 'Creed', image: aventusImage, alt: 'Creed Aventus 100ml' },
  { name: 'Hacivat', brand: 'Nishane', image: hacivatImage, alt: 'Nishane Hacivat Extrait de Parfum' },
  { name: 'Sabah Al Ward', brand: 'Al Wataniah', image: sabahImage, alt: 'Al Wataniah Sabah Al Ward' },
  { name: 'Club de Nuit Intenso Fuego', brand: 'Armaf', image: fuegoImage, alt: 'Armaf Club de Nuit Intenso Fuego' },
  { name: 'Coco Mademoiselle Crush Absolu', brand: 'Chanel, decant', image: cocoImage, alt: 'Chanel Coco Mademoiselle Crush Absolu em decant' },
]

const benefits = [
  'Promoções exclusivas toda semana',
  'Ofertas antecipadas para membros do grupo',
  'Perfumes importados com preços especiais',
  'Fique por dentro das oportunidades de fim de ano',
]

function trackCta(position: CtaPosition) {
  try {
    window.fbq?.('track', 'Lead', { content_name: 'Grupo VIP WhatsApp', position })
  } catch {
    // Analytics is optional and must never block the conversion.
  }

  try {
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push({ event: 'clique_grupo_vip', cta_posicao: position })
  } catch {
    // GTM is optional and must never block the conversion.
  }
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.9.9-2.99-.2-.31a8.2 8.2 0 1 1 6.85 3.73zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.76 2.76 0 0 0-.86 2.05c0 1.21.88 2.38 1 2.55.12.16 1.73 2.64 4.2 3.7 1.56.67 2.17.73 2.95.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m12 2 3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5 9.5 17 19 7.5" />
    </svg>
  )
}

type CtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  position: CtaPosition
  children: ReactNode
}

const CtaLink = forwardRef<HTMLAnchorElement, CtaLinkProps>(function CtaLink({ position, children, className = '', onClick, ...props }, ref) {
  return (
    <a
      {...props}
      ref={ref}
      href={WHATSAPP_GROUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta inline-flex items-center justify-center gap-3 rounded-[4px] border-b-[3px] border-gold bg-indigo px-7 py-4 text-center text-[0.92rem] font-bold tracking-[0.055em] text-white shadow-cta transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:px-8 ${className}`}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) trackCta(position)
      }}
    >
      <WhatsAppIcon />
      {children}
    </a>
  )
})

function Header() {
  return (
    <header className="bg-indigo border-b-2 border-gold">
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <a href="https://casadosperfumesimportados.com.br/" aria-label="Casa dos Perfumes Importados">
          <img className="h-[46px] w-auto brightness-0 invert sm:h-[58px]" src={logoImage} alt="Casa dos Perfumes Importados" width="145" height="58" />
        </a>
        <div className="flex items-center gap-2 text-[0.72rem] text-indigo-soft sm:text-xs">
          <SparkleIcon />
          <span className="hidden sm:inline">Grupo gratuito no WhatsApp</span>
        </div>
      </div>
    </header>
  )
}

function Hero({ ctaRef }: { ctaRef: RefObject<HTMLAnchorElement | null> }) {
  return (
    <section className="hero relative overflow-hidden bg-white" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-gold-wash/50 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-[860px] flex-col items-center px-5 py-16 text-center sm:px-6 sm:py-20">
        <div className="reveal-item flex flex-col items-center">
          <p className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-gold">Acesso antecipado</p>
          <h1 id="hero-title" className="max-w-3xl font-display text-[clamp(2.6rem,7vw,4.7rem)] font-semibold leading-[0.94] text-[#1a1a22]">
            Entre para o Grupo VIP da Casa dos Perfumes
          </h1>
          <div className="my-5 h-0.5 w-16 bg-gold" aria-hidden="true" />
          <p className="max-w-[40ch] text-[clamp(1.08rem,1.7vw,1.28rem)] font-medium leading-relaxed text-ink">
            Promoções exclusivas, perfumes importados com preços especiais e ofertas toda semana.
          </p>
          <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-muted sm:text-base">
            Prepare-se para os grandes descontos de fim de ano e garanta as melhores oportunidades antes de todo mundo.
          </p>
          <CtaLink ref={ctaRef} position="hero" className="mt-8 w-full sm:w-auto">
            QUERO ENTRAR NO GRUPO VIP
          </CtaLink>
          <p className="mt-3 text-xs text-muted sm:text-sm">Entrada gratuita. Você sai do grupo quando quiser.</p>
        </div>
      </div>
    </section>
  )
}

function ProductShelf() {
  return (
    <section className="bg-white px-5 pb-16 sm:px-6 sm:pb-20" aria-labelledby="vitrine-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mb-8 text-center">
          <h2 id="vitrine-title" className="font-display text-[clamp(2rem,4vw,2.7rem)] font-semibold leading-none text-[#1a1a22]">Do árabe ao nicho</h2>
          <p className="mx-auto mt-2 max-w-[44ch] text-sm text-muted sm:text-base">Alguns dos perfumes importados que você encontra na Casa dos Perfumes.</p>
        </div>
        <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-8 sm:overflow-visible sm:px-0">
          {products.map((product) => (
            <li className="reveal-item flex w-[78%] shrink-0 snap-start flex-col items-center text-center sm:w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_6rem)/5)]" key={product.name}>
              <figure className="aspect-square w-full bg-white">
                <img className="h-full w-full object-contain" src={product.image} alt={product.alt} loading="lazy" />
              </figure>
              <strong className="mt-2 block text-sm font-semibold leading-snug text-ink sm:text-[0.98rem]">{product.name}</strong>
              <small className="mt-1 text-xs text-muted">{product.brand}</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Benefits() {
  return (
    <section className="border-y border-line bg-white px-5 py-16 sm:px-6 sm:py-20" aria-labelledby="benefits-title">
      <div className="mx-auto grid w-full max-w-[1120px] items-start gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
        <div className="reveal-item">
          <h2 id="benefits-title" className="max-w-[15ch] font-display text-[clamp(2.2rem,4vw,2.9rem)] font-semibold leading-[1.02] text-[#1a1a22]">Por que entrar no Grupo VIP?</h2>
          <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-muted sm:text-base">Quem está no grupo recebe as oportunidades antes de chegarem ao site.</p>
        </div>
        <ul className="reveal-item border-t border-line">
          {benefits.map((benefit) => (
            <li className="flex items-center gap-4 border-b border-line py-5 text-sm font-medium text-ink sm:text-base" key={benefit}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-light bg-gold-wash text-gold">
                <CheckIcon />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FinalCta({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  return (
    <section ref={sectionRef} className="final bg-white px-5 py-16 sm:px-6 sm:py-20" aria-labelledby="final-title">
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
        <div className="reveal-item order-2 lg:order-1">
          <div className="relative aspect-square overflow-hidden bg-gold-wash">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,.95),transparent_60%)]" aria-hidden="true" />
            <img className="relative h-full w-full object-contain p-5" src={hacivatImage} alt="Nishane Hacivat Extrait de Parfum" loading="lazy" />
          </div>
        </div>
        <div className="reveal-item order-1 lg:order-2">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-gold">Último convite</p>
          <h2 id="final-title" className="max-w-[15ch] font-display text-[clamp(2.2rem,4vw,3rem)] font-semibold leading-[1.02] text-[#1a1a22]">Não fique de fora das melhores ofertas</h2>
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-muted sm:text-base">Entre agora no Grupo VIP da Casa dos Perfumes e receba nossas promoções em primeira mão.</p>
          <CtaLink position="final" className="mt-8 w-full sm:w-auto">ENTRAR NO GRUPO VIP</CtaLink>
          <p className="mt-3 text-xs text-muted sm:text-sm">Entrada gratuita. Você sai do grupo quando quiser.</p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t-2 border-gold bg-indigo px-5 pb-8 pt-7 text-center text-xs text-indigo-soft sm:px-6">
      <img className="mx-auto mb-3 h-11 w-auto brightness-0 invert" src={logoImage} alt="Casa dos Perfumes Importados" width="110" height="44" loading="lazy" />
      <p>© Casa dos Perfumes Importados. Visite a loja: <a className="text-white underline underline-offset-2" href="https://casadosperfumesimportados.com.br/" target="_blank" rel="noopener noreferrer">casadosperfumesimportados.com.br</a></p>
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
    const observerOptions = { threshold: 0.35 }
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting
      update()
    }, observerOptions)
    const finalObserver = new IntersectionObserver(([entry]) => {
      finalVisible = entry.isIntersecting
      update()
    }, observerOptions)

    heroObserver.observe(heroCta)
    finalObserver.observe(finalSection)
    return () => {
      heroObserver.disconnect()
      finalObserver.disconnect()
    }
  }, [finalSectionRef, heroCtaRef])

  return (
    <div className={`fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/90 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 sm:hidden ${visible ? 'translate-y-0' : 'translate-y-[110%]'}`} aria-hidden={!visible}>
      <CtaLink position="sticky" className="w-full px-4 py-3 text-sm tracking-[0.03em]">QUERO ENTRAR NO GRUPO VIP</CtaLink>
    </div>
  )
}

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroCtaRef = useRef<HTMLAnchorElement>(null)
  const finalSectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      timeline
        .from('.hero .reveal-item', { autoAlpha: 0, y: 22, duration: 0.8 })
        .from('.shelf .reveal-item', { autoAlpha: 0, y: 16, duration: 0.45, stagger: 0.08 }, '-=0.3')

      gsap.utils.toArray<HTMLElement>('.benefits .reveal-item, .final .reveal-item').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          ease: 'power3.out',
        })
      })
    }, root)

    return () => context.revert()
  }, [])

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-hidden bg-white font-sans text-ink">
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-3 focus:text-indigo" href="#main-content">Pular para o conteúdo</a>
      <Header />
      <main id="main-content">
        <Hero ctaRef={heroCtaRef} />
        <ProductShelf />
        <Benefits />
        <FinalCta sectionRef={finalSectionRef} />
      </main>
      <Footer />
      <StickyCta heroCtaRef={heroCtaRef} finalSectionRef={finalSectionRef} />
    </div>
  )
}
