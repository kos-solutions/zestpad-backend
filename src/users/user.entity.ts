// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Numele tabelei din baza de date
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  name: string;

  // ✅ AICI ESTE CHEIA: Trebuie să avem coloana asta definită!
  @Column({ default: 'student' }) 
  role: string;
}