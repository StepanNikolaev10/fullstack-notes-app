import type { User } from "src/users/types/user.interface";
import type { Tokens } from "../tokens.interface";


export interface RegistrationArgs {
  readonly email: User['email'];
  readonly username: User['username'];
  readonly password: User['password']
}

export interface LoginArgs {
  readonly email: User['email'];
  readonly password: User['password']
}

export interface RefreshArgs {
  readonly currentRefreshTokenPayload: Tokens['refreshTokenPayload'];
}