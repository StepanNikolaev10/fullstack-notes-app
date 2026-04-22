import type { User } from "src/users/types/user.interface";

export interface Session {
  id: string;
  sessionPayload: {
    userId: User['id'];
    createdAt: number;
    isUpdated: boolean;
  }
}