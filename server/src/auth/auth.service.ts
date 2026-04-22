import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { SessionsService } from './sessions.service';
import { TokensService } from './tokens.service';
import type { User } from 'src/users/types/user.interface';
import { LoginArgs, RefreshArgs, RegistrationArgs } from './types/services/auth-service-args.interfaces';
import { LoginResult, RefreshResult, RegistrationResult } from './types/services/auth-service-results.interfaces';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
    private readonly tokensService: TokensService,
  ) {}

  async registration(args: RegistrationArgs): Promise<RegistrationResult> {
    const candidate = await this.usersService.getUserByEmail(args.email);
    if(candidate) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
    }
    
    const hashPassword = await bcrypt.hash(args.password, 5)
    const user = await this.usersService.createUser({...args, password: hashPassword})

    const newSessionId = uuidv4();
    const jwts = {
      accessToken: await this.tokensService.generateAccessToken({ userId: user.id }),
      refreshToken: await this.tokensService.generateRefreshToken({ userId: user.id, newSessionId: newSessionId })
    }

    await this.sessionsService.createSession({ userId: user.id, sessionId: newSessionId });
    return jwts;
  }

  async login(args: LoginArgs): Promise<LoginResult> {
    const user = await this.validateUser(args);

    const newSessionId = uuidv4();
    const jwts = {
      accessToken: await this.tokensService.generateAccessToken({ userId: user.id }),
      refreshToken: await this.tokensService.generateRefreshToken({ userId: user.id, newSessionId: newSessionId})
    }

    await this.sessionsService.createSession({ userId: user.id,sessionId: newSessionId });
    return jwts;
  }

  async refresh(args: RefreshArgs): Promise<RefreshResult> {
    const session = await this.sessionsService.getSession(args.currentRefreshTokenPayload.sessionId);
    if (!session) throw new UnauthorizedException('Session expired or invalid');

    const newSessionId = uuidv4();

    const refreshResult = await this.sessionsService.updateSession({
      userId: args.currentRefreshTokenPayload.userId,
      currentSessionId: args.currentRefreshTokenPayload.sessionId,
      newSessionId: newSessionId,
    });

    if (refreshResult !== 'OK' && refreshResult !== 'ALREADY_UPDATED') {
      throw new UnauthorizedException('Session expired or invalid')
    }

    const accessToken = await this.tokensService.generateAccessToken({ userId: args.currentRefreshTokenPayload.userId });
    
    if(refreshResult === 'OK') {
      const refreshToken = await this.tokensService.generateRefreshToken({ userId: args.currentRefreshTokenPayload.userId, newSessionId}); 
      return {
        accessToken: accessToken,
        refreshToken: refreshToken
      }
    } else {
      return {
        accessToken: accessToken,
      }
    }
  
  }

  private async validateUser(args: LoginArgs): Promise<User> {
    const user = await this.usersService.getUserByEmail(args.email);
    if(!user) {
      throw new UnauthorizedException({message: 'Некорректный емейл'})
    }
    const passwordEquals = await bcrypt.compare(args.password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException({message: 'Некорректный пароль'})
    }
    return user;
  }

}
