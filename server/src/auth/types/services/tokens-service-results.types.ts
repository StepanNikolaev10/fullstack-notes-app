import type { Tokens } from "../tokens.interface"

export type GenerateAccessTokenResult = Tokens['accessToken'];
export type GenerateRefreshTokenResult = Tokens['refreshToken'];
export type VerifyAccessTokenResult = Tokens['accessTokenPayload'];
export type VerifyRefreshTokenResult = Tokens['refreshTokenPayload'];