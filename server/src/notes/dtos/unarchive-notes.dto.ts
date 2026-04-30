import { ArrayNotEmpty, ArrayUnique, IsArray, IsString } from 'class-validator';

export class UnarchiveNotesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  readonly noteIds: string[];
}
