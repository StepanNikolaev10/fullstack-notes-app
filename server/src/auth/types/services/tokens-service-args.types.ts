import type { User } from "src/users/types/user.interface";
import type { Session } from "../session.interface";
import type { Tokens } from "../tokens.interface";

export interface GenerateAccessTokenArgs {
  readonly userId: User['id'];
}

export interface GenerateRefreshTokenArgs {
  readonly userId: User['id'];
  readonly newSessionId: Session['id'];
}

export type VerifyAccessTokenArgs = Tokens['accessToken'];

export type VerifyRefreshTokenArgs = Tokens['refreshToken'];