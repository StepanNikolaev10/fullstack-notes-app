import type { User } from "src/users/types/user.interface";
import type { JwtPayload } from "jsonwebtoken";
import type { Session } from "./session.interface";

interface GeneralPayload extends JwtPayload {
  readonly userId: User['id']
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessTokenPayload: GeneralPayload;
  refreshTokenPayload: GeneralPayload & {
    readonly sessionId: Session['id'];
  }

}