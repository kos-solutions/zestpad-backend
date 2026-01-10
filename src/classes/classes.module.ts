import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Class } from './class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class])], // Încărcăm entitatea
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}