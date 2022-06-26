import { IncomingMessage } from 'http'
import cookie from 'cookie'

export const parseCookies = (req?: IncomingMessage) => {
  if (!req) return
  return cookie.parse(req.headers.cookie ?? '')
}
