# passport-cognito-jwt

Based on [passport-jwt](https://github.com/mikenicholson/passport-jwt) 

A very simple [Passport](http://passportjs.org/) strategy to authenticate with AWS Cognito.

This module lets you authenticate endpoints when using Cognito Auth in a NestJS application.

## Install

    npm install passport-cognito-jwt

## Usage

NestJS TypeScript usage example:

Strategy name is: `cognito-jwt`.

#### auth.strategy.ts
```ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CognitoJwtStrategy } from 'passport-cognito-jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  private verifier: CognitoJwtVerifierSingleUserPool<{
    userPoolId: string
    tokenUse: 'access'
    clientId: string
  }>

  constructor(
    private configService: AppConfigService,
  ) {
    super()

    this.verifier = CognitoJwtVerifier.create({
      userPoolId: this.configService.userPoolId,
      tokenUse: 'access',
      clientId: this.configService.clientId,
    })
  }

  validate = async (token: string): Promise<AuthenticatedUser> => {
    const payload = await this.verifier.verify(token)

    // Access cognitoId using `payload.sub`
  }
}
```

#### auth.module.ts
```ts
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthStrategy } from './auth.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'cognito-jwt' }),
  ],
  providers: [AuthStrategy],
})
export class AuthModule {}
```
