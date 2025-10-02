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

    // 2) Conexiune la Postgres
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER || 'zestpad',
      password: process.env.DB_PASS || 'zestpad',
      database: process.env.DB_NAME || 'zestdb',
      autoLoadEntities: true,
      synchronize: true, // doar pentru DEV! (în PROD se fac migrations)
    }),

    // 3) Modulele aplicației
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
