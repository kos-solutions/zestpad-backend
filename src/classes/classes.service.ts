import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classesRepository: Repository<Class>,
  ) {}

  async create(dto: CreateClassDto, teacherId: number) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newClass = this.classesRepository.create({
      name: dto.name,
      code: code,
      // ✅ ACUM E SIGUR: Salvăm direct ID-ul primit din controller.
      // Nu mai există ambiguitate pentru baza de date.
      teacherId: teacherId, 
    });

    return this.classesRepository.save(newClass);
  }

  async findAllForTeacher(teacherId: number) {
    return this.classesRepository.find({
      // Putem căuta direct după ID
      where: { teacherId: teacherId },
      order: { id: 'DESC' }
    });
  }
}