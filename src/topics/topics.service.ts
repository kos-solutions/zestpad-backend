import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private repo: Repository<Topic>,
  ) {}

  async create(dto: CreateTopicDto) {
    const topic = this.repo.create({
      title: dto.title,
      background: dto.background || 'white',
      class: { id: dto.classId } as any // Legăm direct prin ID
    });
    return this.repo.save(topic);
  }

  async findAllByClass(classId: number) {
    return this.repo.find({ where: { classId } });
  }
}