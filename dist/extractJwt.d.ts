import { Request } from 'express';
type JwtFromRequest = (request: Request) => string | null;
export declare const fromAuthHeaderWithScheme: (authScheme: string) => JwtFromRequest;
export declare const fromAuthHeaderAsBearerToken: () => JwtFromRequest;
export {};
