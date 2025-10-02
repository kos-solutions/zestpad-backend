import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

class CreateUserDto {
  name!: string;
  email!: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.users.create({ name: body.name, email: body.email });
  }
}
