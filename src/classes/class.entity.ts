import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  // ✅ PĂSTRĂM DOAR RELAȚIA
  // TypeORM va crea automat coloana 'teacherId' în spate datorită @JoinColumn
  @ManyToOne(() => User, { nullable: false }) // nullable: false face obligatorie legătura
  @JoinColumn({ name: 'teacherId' }) 
  teacher: User;
}