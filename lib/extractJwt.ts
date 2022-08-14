import { Request } from 'express'

const re = /(\S+)\s+(\S+)/

const parseAuthHeader = (authHeaderValue: unknown) => {
  if (typeof authHeaderValue !== 'string') {
    return null
  }
  const matches = authHeaderValue.match(re)
  return matches && { scheme: matches[1], value: matches[2] }
}

const authHeader = 'authorization'

type JwtFromRequest = (request: Request) => string | null

export const fromAuthHeaderWithScheme = (
  authScheme: string,
): JwtFromRequest => {
  return (request: Request) => {
    const authHeaderValue: unknown = request.headers[authHeader]

    if (!authHeaderValue) {
      return null
    }

    const authParams = parseAuthHeader(authHeaderValue)
    if (authParams && authScheme === authParams.scheme.toLowerCase()) {
      return authParams.value
    }

    return null
  }
}

export const fromAuthHeaderAsBearerToken = (): JwtFromRequest =>
  fromAuthHeaderWithScheme('bearer')
