import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private repo: Repository<Lesson>,
  ) {}

  async create(dto: CreateLessonDto) {
    const lesson = this.repo.create({
      title: dto.title,
      type: dto.type,
      topic: { id: dto.topicId } as any
    });
    return this.repo.save(lesson);
  }

  // AICI ESTE FIX-UL PENTRU FUNDALUL TABLEI!
  // Returnăm și topic-ul ca să știm ce background are
  async findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['topic'] 
    });
  }

  async findAllByTopic(topicId: number) {
    return this.repo.find({ where: { topicId } });
  }

  async updateContent(id: number, content: string) {
    return this.repo.update(id, { content });
  }
}