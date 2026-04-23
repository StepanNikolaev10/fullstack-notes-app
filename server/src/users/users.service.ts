import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOne(email: string, username: string, hashedPassword: string) {
    const createdUser = await this.prismaService.user.create({
      data: {
        email,
        username,
        hashedPassword,
      },
    });

    return createdUser;
  }

  async getOne(id?: string, email?: string) {
    if (!id && !email) {
      throw new BadRequestException();
    }

    const user = await this.prismaService.user.findFirst({
      where: {
        id,
        email,
      },
    });

    return user;
  }
}
