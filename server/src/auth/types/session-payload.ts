import type { User } from '../../../prisma/generated/client';

export type TSessionPayload = {
  userId: User['id'];
  createdAt: number;
  isUpdated: boolean;
};
