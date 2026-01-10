import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Class } from './class.entity';
import { AuthModule } from '../auth/auth.module'; // <--- Importă AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    AuthModule, // <--- ✅ ADĂUGĂM ASTA: Acum controller-ul are acces la AuthGuard
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}