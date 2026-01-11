import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';

@Controller('topics')
@UseGuards(AuthGuard('jwt'))
export class TopicsController {
  constructor(private service: TopicsService) {}

  @Post()
  create(@Body() dto: CreateTopicDto) {
    // Aici nu mai avem nevoie neapărat de userId, pentru că legăm folderul de Clasă.
    // Frontend-ul trimite { title: "Algebra", classId: 5, background: "paper-math" }
    return this.service.create(dto);
  }

  @Get('class/:classId')
  findAll(@Param('classId') classId: string) {
    return this.service.findAllByClass(Number(classId));
  }
}