import { Body, Controller, Get, Post, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('classes')
@UseGuards(AuthGuard('jwt')) 
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @Post()
  create(@Body() dto: CreateClassDto, @Request() req) {
    // ✅ MODIFICAT: Citim 'userId' pentru că așa ne-a arătat log-ul că vine din token
    const teacherId = req.user.userId || req.user.sub; 
    
    console.log('User ID extras:', teacherId); // Debug ca să fim siguri

    if (!teacherId) {
       throw new BadRequestException("Nu te pot identifica. Te rog reloghează-te.");
    }

    return this.classesService.create(dto, teacherId);
  }

  @Get()
  findAll(@Request() req) {
    // ✅ MODIFICAT și aici
    const teacherId = req.user.userId || req.user.sub;
    return this.classesService.findAllForTeacher(teacherId);
  }
}