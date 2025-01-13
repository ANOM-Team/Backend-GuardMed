import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userRepository.findByEmail(registerDto.email);
    if (user) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = {
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      // Add other required properties with default values
      favorites: [],
      role: 'user',
      verified: false,
    };
    return this.userRepository.create(newUser);
  }

  async verify(verifyDto: VerifyDto) {
    const user = await this.userRepository.findById(verifyDto.id);
    if (!user) {
      return null;
    }
    if (user.verified) {
      return null;
    }
    if (verifyDto.code !== user.code) {
      return null;
    }

    this.userRepository.removeField('users/userId', 'code');
    return this.userRepository.update(verifyDto.id, { verified: true });
  }
}
