export type LinkId = 'grupo_vip' | 'loja' | 'atendimento'

const env = import.meta.env

export const LINKS: Record<LinkId, string> = {
  grupo_vip: env.VITE_GRUPO_VIP_URL || 'https://chat.whatsapp.com/C7OJBwO7TMtKRoO5VGaHV6?s=cl&p=a&ilr=4&iam=1',
  loja: env.VITE_LOJA_URL || 'https://casadosperfumesimportados.com.br/',
  atendimento: env.VITE_ATENDIMENTO_URL || 'mailto:vendas@casadosperfumesimportados.com.br',
}
