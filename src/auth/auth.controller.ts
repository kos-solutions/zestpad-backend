import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import type { UserRole } from '../users/user.entity';

class RegisterDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(4)
  password!: string;

  @IsOptional()
  role?: UserRole; // importat ca tip-only
}

class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(4)
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    const dto = plainToInstance(RegisterDto, body);
    await validateOrReject(dto);
    return this.auth.register({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role,
    });
  }

  @Post('login')
  async login(@Body() body: any) {
    const dto = plainToInstance(LoginDto, body);
    await validateOrReject(dto);
    return this.auth.login(dto.email, dto.password);
  }
}
