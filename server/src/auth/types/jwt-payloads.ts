import type { User } from '../../../prisma/generated/client';

export type TAccessToken = {
  userId: User['id'];
};

export type TRefreshToken = {
  userId: User['id'];
  sessionId: string;
};
