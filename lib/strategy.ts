import { Request } from 'express'
import { Strategy } from 'passport-strategy'
import { fromAuthHeaderAsBearerToken } from './extractJwt'

type Options = {
  jwtFromRequest?: (req: Request) => string | null
}

type Verify = (
  token: string,
  callback: (err: Error | null, user: unknown, info: number) => void,
) => void

export class CognitoJwtStrategy extends Strategy {
  name = 'cognito-jwt'
  jwtFromRequest: (req: Request) => string | null
  verify: Verify

  constructor(options: Options, verify: Verify) {
    super()

    this.jwtFromRequest =
      options.jwtFromRequest ?? fromAuthHeaderAsBearerToken()

    this.verify = verify
  }

  authenticate = (req: Request): void => {
    const token = this.jwtFromRequest(req)

    if (!token) {
      return this.fail(new Error('No auth token'), 400)
    }

    this.verify(token, (err, user, info) => {
      if (err) {
        this.error(err)
      } else if (!user) {
        this.fail(info)
      } else {
        this.success(user, info)
      }
    })
  }
}
