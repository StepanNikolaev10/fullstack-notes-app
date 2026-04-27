import { IsInt, IsString } from 'class-validator';

export class UpdateNotePosisionDto {
  @IsString()
  readonly noteId: string;

  @IsInt()
  readonly updatedPositionNumber: number;
}
