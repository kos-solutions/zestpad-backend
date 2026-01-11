import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  classId: number; // Frontend-ul trebuie să trimită ID-ul clasei

  @IsString()
  @IsOptional()
  background?: string;
}