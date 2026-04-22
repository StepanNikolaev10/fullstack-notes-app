import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import { RedisModule } from 'src/redis/redis.module';
import { SessionsService } from './sessions.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokensService, SessionsService],
  imports: [
    UsersModule,
    JwtModule.register({}),
    RedisModule
  ],
  exports: [TokensService]
})
export class AuthModule {}
