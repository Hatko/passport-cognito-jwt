import { Request } from 'express';
import { Strategy } from 'passport-strategy';
type Options = {
    jwtFromRequest?: (req: Request) => string | null;
};
type Verify = (token: string, callback: (err: Error | null, user: unknown, info: number) => void) => void;
export declare class CognitoJwtStrategy extends Strategy {
    name: string;
    jwtFromRequest: (req: Request) => string | null;
    verify: Verify;
    constructor(options: Options, verify: Verify);
    authenticate: (req: Request) => void;
}
export {};
