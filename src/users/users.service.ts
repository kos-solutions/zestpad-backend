import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll() {
    return this.repo.find({ select: ['id', 'name', 'email', 'role'] });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(name: string, email: string) {
    const u = this.repo.create({ name, email, passwordHash: '!', role: 'student' });
    return this.repo.save(u);
  }

  async createWithPassword(params: { name: string; email: string; passwordHash: string; role?: UserRole }) {
    const u = this.repo.create({
      name: params.name,
      email: params.email,
      passwordHash: params.passwordHash,
      role: params.role ?? 'student',
    });
    return this.repo.save(u);
  }
}
