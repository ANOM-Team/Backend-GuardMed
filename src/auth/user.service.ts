import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findByEmail(loginDto.email);
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
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
        user.password = await bcrypt.hash(registerDto.password, 10);
        return this.userRepository.create( user );
    }
}