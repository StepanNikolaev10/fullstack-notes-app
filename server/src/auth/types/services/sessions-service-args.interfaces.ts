import type { User } from "src/users/types/user.interface";
import type { Session } from "../session.interface";

export interface CreateSessionArgs {
  readonly userId: User['id'];
  readonly sessionId: Session['id'];
}

export interface UpdateSessionArgs {
  readonly userId: User['id'];
  readonly currentSessionId: Session['id'];
  readonly newSessionId: Session['id'];
}