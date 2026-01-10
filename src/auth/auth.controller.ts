// src/auth/auth.controller.ts
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto'; // <--- IMPORTĂM NOUL FIȘIER
import { LoginDto } from './dto/login.dto'; // Dacă nu ai fișierul ăsta, folosește tot RegisterDto sau crează-l similar, dar hai să ne focusăm pe register acum.

// Dacă nu ai login.dto.ts, poți șterge linia cu LoginDto și folosi 'any' jos la login, dar la register e important.

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  signup(@Body() dto: RegisterDto) { // <--- FOLOSIM RegisterDto AICI
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signin(@Body() dto: any) { // Momentan lasă any sau LoginDto dacă ai
    return this.authService.login(dto);
  }
}