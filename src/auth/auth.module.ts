import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { localStrategy } from './strategies/local-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken-strategy';

@Module({
  providers: [AuthService, UserService, localStrategy, JwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: {
        expiresIn: '60s'
      }
    })]
})
export class AuthModule { }
