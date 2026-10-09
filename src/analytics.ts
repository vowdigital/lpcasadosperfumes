import type { LinkId } from './config'

const EVENT_NAMES: Record<LinkId, string> = {
  grupo_vip: 'clique_grupo_vip',
  loja: 'clique_loja',
}

function pushToDataLayer(payload: Record<string, unknown>) {
  try {
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push(payload)
  } catch {
    // O GTM é opcional.
  }
}

export function trackVisit() {
  pushToDataLayer({ event: 'visita_lp', pagina: 'grupo_vip' })

  try {
    window.fbq?.('track', 'ViewContent', { content_name: 'LP Grupo VIP' })
  } catch {
    // A análise não pode impedir a navegação.
  }
}

export function trackClick(linkId: LinkId, url: string) {
  pushToDataLayer({ event: EVENT_NAMES[linkId], link_id: linkId, link_url: url })

  try {
    if (linkId === 'grupo_vip') {
      window.fbq?.('track', 'Lead', { content_name: 'Grupo VIP WhatsApp' })
    } else {
      window.fbq?.('trackCustom', EVENT_NAMES[linkId], { link_id: linkId })
    }
  } catch {
    // A análise não pode impedir a navegação.
  }
}
