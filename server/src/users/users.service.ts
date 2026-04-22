import { Injectable } from '@nestjs/common';
import type { UserCreateArgs } from './types/services/users-service-args.interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async createUser(dto: UserCreateArgs): Promise<UserEntity> {
    const user = this.userRepository.create(dto);
    await this.userRepository.save(user)
    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity| null> {
    const user = await this.userRepository.findOne({where: { email }});
    return user;
  }

}
