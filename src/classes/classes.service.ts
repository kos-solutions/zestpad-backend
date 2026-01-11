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

    // ✅ Corect: TypeORM știe să lege relația doar primind ID-ul într-un obiect
    const newClass = this.classesRepository.create({
      name: dto.name,
      code: code,
      teacher: { id: teacherId } as any // "as any" ajută TypeScript să nu se plângă că lipsește restul userului
    });

    return this.classesRepository.save(newClass);
  }

  async findAllForTeacher(teacherId: number) {
    return this.classesRepository.find({
      where: { teacher: { id: teacherId } },
      order: { id: 'DESC' }
    });
  }
}