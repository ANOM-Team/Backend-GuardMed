import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      return new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return new BadRequestException('Invalid password');
    }
    if (!user.verified) {
      return new UnauthorizedException('User not verified');
    }
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userRepository.findByEmail(registerDto.email);
    if (user) {
      return new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = {
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      favorites: [],
      role: 'user',
      verified: false,
      code: Math.floor(1000 + Math.random() * 9000),
    };
    const userId = this.userRepository.create(newUser);

    // Send verification email
    await this.mailService.sendUserConfirmation(
      registerDto.email,
      newUser.code,
    );
    return userId;
  }

  async verify(verifyDto: VerifyDto) {
    const user = await this.userRepository.findById(verifyDto.id);
    if (!user) {
      return new NotFoundException('User not found');
    }
    if (user.verified) {
      return new UnauthorizedException('User already verified');
    }
    if (verifyDto.code !== user.code) {
      return new BadRequestException('Invalid code');
    }

    return this.userRepository.update(verifyDto.id, { verified: true });
  }
}
