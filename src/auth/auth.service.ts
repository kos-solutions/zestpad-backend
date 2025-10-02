import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService, // <-- trebuie să fie exact tipul din UsersModule
    private readonly jwt: JwtService,
  ) {}

  // … restul metodelor register/login
}
