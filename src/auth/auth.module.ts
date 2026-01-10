import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // 1. Module externe necesare
    UsersModule, 
    PassportModule,
    
    // 2. Configurare JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET') || 'secret',
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  // Punem JwtStrategy la providers ca să funcționeze AuthGuard
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
// ✅ AICI ERA UNA DIN ERORI: Trebuie neapărat 'export'
export class AuthModule {}