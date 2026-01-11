// src/topics/topic.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Class } from '../classes/class.entity';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'white' }) 
  background: string;

  @Column({ name: 'classId' })
  classId: number;

  // ✅ MODIFICAT: Am scos al doilea parametru care cauza eroarea.
  // Acum relația este simplă și sigură.
  @ManyToOne(() => Class, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'classId' })
  class: Class;
}