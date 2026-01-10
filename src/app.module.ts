import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1) Încărcăm .env global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2) Conexiune la Postgres (Varianta Railway)
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Folosim variabila DATABASE_URL care conține tot (user, parolă, host)
      url: process.env.DATABASE_URL, 
      
      autoLoadEntities: true,
      synchronize: true, // În producție reală e false, dar pentru noi e ok acum
      
      // IMPORTANT: Railway cere conexiune securizată (SSL)
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    // 3) Modulele aplicației
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}