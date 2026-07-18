/**
 * Abstracted logger for the application.
 * Currently wraps `console`, but can be replaced with Sentry, Datadog, etc.
 * without affecting the rest of the application.
 */

type LogData = Record<string, any>

export const logger = {
  info: (message: string, data?: LogData) => {
    console.info(`[INFO] ${message}`, data ? data : '')
  },
  warn: (message: string, data?: LogData) => {
    console.warn(`[WARN] ${message}`, data ? data : '')
  },
  error: (message: string, data?: LogData) => {
    console.error(`[ERROR] ${message}`, data ? data : '')
  },
  debug: (message: string, data?: LogData) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${message}`, data ? data : '')
    }
  }
}
