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
    // 🔍 DEBUG: Vedem ce user a detectat serverul
    console.log('User din request:', req.user);

    const teacherId = req.user.sub; // ar trebui să fie ID-ul (ex: 1)
    
    if (!teacherId) {
       console.error("ALERTA: Nu am gasit ID-ul profesorului in token!");
       throw new BadRequestException("Nu te pot identifica. Te rog reloghează-te.");
    }

    return this.classesService.create(dto, teacherId);
  }

  @Get()
  findAll(@Request() req) {
    return this.classesService.findAllForTeacher(req.user.sub);
  }
}