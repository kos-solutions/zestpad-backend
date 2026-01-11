import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Topic } from '../topics/topic.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', default: '' }) // Aici stocăm JSON-ul desenului
  content: string;

  @Column({ default: 'theory' }) // 'theory' sau 'homework'
  type: string;

  @ManyToOne(() => Topic, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topicId' })
  topic: Topic;

  @Column({ name: 'topicId' })
  topicId: number;
}