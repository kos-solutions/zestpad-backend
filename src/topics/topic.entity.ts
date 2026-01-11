import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Class } from '../classes/class.entity';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // Aici salvăm "paper-math", "paper-music", etc.
  @Column({ default: 'white' }) 
  background: string;

  // Legătura cu Clasa
  @ManyToOne(() => Class, (cls) => cls.topics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'classId' })
  class: Class;

  @Column({ name: 'classId' })
  classId: number;
}