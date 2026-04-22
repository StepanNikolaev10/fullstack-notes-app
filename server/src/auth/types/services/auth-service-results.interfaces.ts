import type { Tokens } from "../tokens.interface";

export interface RegistrationResult {
  readonly accessToken: Tokens['accessToken'];
  readonly refreshToken: Tokens['refreshToken'];
}

export interface LoginResult {
  readonly accessToken: Tokens['accessToken'];
  readonly refreshToken: Tokens['refreshToken'];
}

export interface RefreshResult {
  readonly accessToken: Tokens['accessToken'];
  readonly refreshToken?: Tokens['refreshToken'];
}