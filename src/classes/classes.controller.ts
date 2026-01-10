import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('classes')
// 🔒 PROTECTIE: Doar userii logați au voie aici
@UseGuards(AuthGuard('jwt')) 
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  // POST /classes -> Creează o clasă
  @Post()
  create(@Body() dto: CreateClassDto, @Request() req) {
    // req.user este pus automat de AuthGuard din token-ul tău
    const teacherId = req.user.sub; // 'sub' este ID-ul userului în standardul JWT
    return this.classesService.create(dto, teacherId);
  }

  // GET /classes -> Vezi clasele tale
  @Get()
  findAll(@Request() req) {
    const teacherId = req.user.sub;
    return this.classesService.findAllForTeacher(teacherId);
  }
}