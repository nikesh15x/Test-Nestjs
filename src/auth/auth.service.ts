import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService, private jwtService: JwtService) { }


  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUsername(username)

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...results } = user
      return results
    }

    return null;
  }


  async login(user: User) {
    const payload = {
      username: user.email,
      sub: {
        username: user.name
      }
    }
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d'
      })
    }
  }


  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        username: user.name
      }
    }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
