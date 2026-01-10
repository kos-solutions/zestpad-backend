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

  // Crearea unei clase noi
  async create(dto: CreateClassDto, teacherId: number) {
    // Generăm un cod aleator de 6 caractere
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newClass = this.classesRepository.create({
      name: dto.name,
      code: code,
      teacherId: teacherId, // AICI e secretul: legăm clasa de profesorul logat
    });

    return this.classesRepository.save(newClass);
  }

  // Găsește toate clasele unui profesor
  async findAllForTeacher(teacherId: number) {
    return this.classesRepository.find({
      where: { teacherId },
      order: { id: 'DESC' }
    });
  }
}