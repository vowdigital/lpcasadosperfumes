import { useEffect, useRef, type ReactNode } from 'react'
import logoImage from '../img/logo-casa-dos-perfumes.webp'
import perfume1 from '../img/perfumes/perfume1.webp'
import perfume2 from '../img/perfumes/perfume2.webp'
import perfume3 from '../img/perfumes/perfume3.webp'
import { trackClick, trackVisit } from './analytics'
import { LINKS, type LinkId } from './config'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.9.9-2.99-.2-.31a8.2 8.2 0 1 1 6.85 3.73zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.76 2.76 0 0 0-.86 2.05c0 1.21.88 2.38 1 2.55.12.16 1.73 2.64 4.2 3.7 1.56.67 2.17.73 2.95.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  )
}

function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5a2.75 2.75 0 0 0 5.33 1 2.75 2.75 0 0 0 5.34 0 2.75 2.75 0 0 0 5.33-1M4 9.5V20h16V9.5M10 20v-5h4v5" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.1A8 8 0 1 1 20 12z" />
      <path d="M9 11.5h6M9 14.5h3.5" />
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

// A ordem define a posição no leque: esquerda, centro (destaque) e direita.
const PERFUMES = [
  { src: perfume1, alt: 'Perfume importado feminino' },
  { src: perfume2, alt: 'Perfume importado unissex' },
  { src: perfume3, alt: 'Perfume importado masculino' },
]

function PerfumeShowcase() {
  return (
    <div className="showcase">
      {PERFUMES.map((perfume) => (
        <div className="showcase-card" key={perfume.src}>
          <img src={perfume.src} alt={perfume.alt} width="1000" height="1000" loading="eager" />
        </div>
      ))}
    </div>
  )
}

type TrackedLinkProps = {
  id: LinkId
  className: string
  children: ReactNode
}

function TrackedLink({ id, className, children }: TrackedLinkProps) {
  const url = LINKS[id]
  const external = url.startsWith('http')

  return (
    <a
      className={className}
      href={url}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-link-id={id}
      onClick={() => trackClick(id, url)}
    >
      {children}
    </a>
  )
}

export default function App() {
  const visitTracked = useRef(false)

  useEffect(() => {
    if (visitTracked.current) return
    visitTracked.current = true
    trackVisit()
  }, [])

  return (
    <main className="page">
      <div className="card">
        <img className="logo" src={logoImage} alt="Casa dos Perfumes Importados" width="210" height="79" fetchPriority="high" />

        <PerfumeShowcase />

        <h1>As melhores oportunidades em perfumes estão no nosso <em>Grupo VIP.</em></h1>
        <p className="lead">Entre no grupo e acompanhe nossas ofertas e novidades.</p>

        <TrackedLink id="grupo_vip" className="cta">
          <WhatsAppIcon />
          <span>Entrar no Grupo VIP</span>
          <ArrowIcon />
        </TrackedLink>

        <nav className="secondary" aria-label="Outros links">
          <TrackedLink id="loja" className="secondary-link">
            <StoreIcon />
            Visitar a loja
          </TrackedLink>
          <TrackedLink id="atendimento" className="secondary-link">
            <ChatIcon />
            Falar com atendimento
          </TrackedLink>
        </nav>
      </div>

      <footer className="footer">© {new Date().getFullYear()} Casa dos Perfumes Importados</footer>
    </main>
  )
}
