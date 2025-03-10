import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import type { JwtPayload } from "./interfaces/jwt-payload.interface"

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(RegisterDto: RegisterDto){
        const { name, email, password } = RegisterDto;

        const userExists = await this.usersService.findByEmail(email);
        if (userExists) {
            throw new ConflictException('Email already in use');
        }

        const salt = await bcrypt.genSalt();
        const password_hash = await bcrypt.hash(password, salt);

        const user = await this.usersService.create({
            name,
            email,
            password_hash,
        });

        const payload: JwtPayload = { id: user.id, email: user.email }
        const accessToken = this.jwtService.sign(payload);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
        },
        accessToken,
        };
    }

    async login(LoginDto: LoginDto){
        const { email, password } = LoginDto;

        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { id: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            accessToken
        };
    }
}
