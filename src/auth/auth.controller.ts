import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

class RegisterDto {
  name!: string;
  email!: string;
  password!: string;
}

class LoginDto {
  email!: string;
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto.name, dto.email, dto.password);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }
}
