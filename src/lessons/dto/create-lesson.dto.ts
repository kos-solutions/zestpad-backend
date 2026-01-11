import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  topicId: number;

  @IsString()
  type: string;
}