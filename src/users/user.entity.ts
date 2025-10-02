import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  // hash-ul parolei (NU păstrăm parole în clar)
  @Column()
  passwordHash: string;

  @Column({ default: 'student' })
  role: UserRole;
}
