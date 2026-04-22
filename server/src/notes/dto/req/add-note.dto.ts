import { IsString, MaxLength } from 'class-validator';

export class AddNoteDto {
  @IsString()
  @MaxLength(200, { message: 'Title cannot be longer than 200 characters' })
  readonly title: string;

  @IsString()
  @MaxLength(10000, { message: 'Main text cannot be longer than 10000 characters' })
  readonly mainText: string;
}