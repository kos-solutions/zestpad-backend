import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService, private readonly jwt: JwtService) {}

  async register(params: { name: string; email: string; password: string; role?: UserRole }) {
    const existing = await this.users.findByEmail(params.email);
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(params.password, 10);
    const user = await this.users.createWithPassword({
      name: params.name,
      email: params.email,
      passwordHash,
      role: params.role ?? 'student',
    });

    const token = await this.issueToken(user.id, user.email, user.role);
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const token = await this.issueToken(user.id, user.email, user.role);
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }

  private issueToken(id: number, email: string, role: UserRole) {
    return this.jwt.signAsync({ sub: id, email, role });
  }
}
