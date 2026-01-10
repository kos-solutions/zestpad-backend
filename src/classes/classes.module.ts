// src/classes/classes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Class } from './class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class])], // <--- Foarte important pentru baza de date
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}