/**
 * Generates sharing payloads for the Web Share API.
 */

export type ShareType = 'SQUAD_INVITE' | 'ACHIEVEMENT' | 'PORTFOLIO' | 'LEVEL_UP'

export interface SharePayload {
  title: string
  text: string
  url?: string
}

export function generateSharePayload(type: ShareType, data: any): SharePayload {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://stockup.app'

  switch (type) {
    case 'SQUAD_INVITE':
      return {
        title: 'Join my Squad on StockUp!',
        text: `I just created a squad on StockUp! Use my invite code ${data.code} to join and let's dominate the leaderboards together.`,
        url: `${baseUrl}/dashboard/social`,
      }
    case 'LEVEL_UP':
      return {
        title: 'Level Up on StockUp',
        text: `I just hit Level ${data.level} on StockUp! Think you can beat me?`,
        url: baseUrl,
      }
    case 'PORTFOLIO':
      return {
        title: 'My StockUp Portfolio',
        text: `My virtual portfolio just hit ₹${data.balance.toLocaleString()} on StockUp.`,
        url: baseUrl,
      }
    case 'ACHIEVEMENT':
      return {
        title: 'Achievement Unlocked!',
        text: `I just unlocked the "${data.badgeName}" badge on StockUp!`,
        url: baseUrl,
      }
    default:
      return {
        title: 'StockUp',
        text: 'Join me on StockUp to learn trading risk-free!',
        url: baseUrl,
      }
  }
}

/**
 * Attempts to use the native Web Share API.
 * Falls back to clipboard copy if unsupported.
 */
export async function shareContent(payload: SharePayload) {
  if (navigator.share) {
    try {
      await navigator.share(payload)
      return { method: 'NATIVE_SHARE', success: true }
    } catch (err: any) {
      // User aborted or failed
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err)
      }
      return { method: 'NATIVE_SHARE', success: false }
    }
  } else {
    // Fallback: Copy to clipboard
    const textToCopy = `${payload.text} ${payload.url || ''}`.trim()
    try {
      await navigator.clipboard.writeText(textToCopy)
      return { method: 'CLIPBOARD', success: true }
    } catch (err) {
      console.error('Clipboard write failed:', err)
      return { method: 'CLIPBOARD', success: false }
    }
  }
}
