// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClassesModule } from './classes/classes.module'; // <--- 1. IMPORT IMPORTANT

@Module({
  imports: [
    // Configurare .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configurare Bază de Date (Railway)
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    // Modulele Aplicației
    UsersModule,
    AuthModule,
    ClassesModule, // <--- 2. AICI TREBUIE SĂ FIE LISTAT!
  ],
})
export class AppModule {}