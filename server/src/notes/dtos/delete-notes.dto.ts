import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsString,
} from 'class-validator';

export class DeleteNotesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  readonly noteIds: string[];
}
