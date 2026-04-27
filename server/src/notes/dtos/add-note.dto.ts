import { IsString, MaxLength } from 'class-validator';

export class AddNoteDto {
  @IsString()
  @MaxLength(200)
  readonly title: string;

  @IsString()
  @MaxLength(10000)
  readonly mainText: string;
}