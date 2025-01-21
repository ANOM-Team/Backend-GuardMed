import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('verify')
  async verify(@Body() verifyDto: VerifyDto) {
    return this.userService.verify(verifyDto);
  }

  @Post('forgot')
  async forgotPassword(@Body() email: string) {
    return this.userService.forgotPassword(email);
  }

  @Post('reset')
  async resetPassword(@Body() code: number, email: string) {
    return this.userService.resetPassword(code, email);
  }

  @Post('new-password')
  async newPassword(@Body() password: string, email: string) {
    return this.userService.newPassword(password, email);
  }
}
