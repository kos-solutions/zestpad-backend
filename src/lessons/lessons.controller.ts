import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller('lessons')
@UseGuards(AuthGuard('jwt'))
export class LessonsController {
  constructor(private service: LessonsService) {}

  @Post()
  create(@Body() dto: CreateLessonDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Get('topic/:topicId')
  findAll(@Param('topicId') topicId: string) {
    return this.service.findAllByTopic(Number(topicId));
  }

  @Patch(':id/content')
  updateContent(@Param('id') id: string, @Body('content') content: string) {
    return this.service.updateContent(Number(id), content);
  }
}