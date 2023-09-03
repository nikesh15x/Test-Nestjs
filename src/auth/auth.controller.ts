import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private AuthService: AuthService, private userService: UserService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.AuthService.login(req.user)
  }


  @Post('register')
  async register(@Body() CreateUserDto: CreateUserDto) {
    return await this.userService.create(CreateUserDto)
  }



  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.AuthService.refreshToken(req.user)
  }

}
