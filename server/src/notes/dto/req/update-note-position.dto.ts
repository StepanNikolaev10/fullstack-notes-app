import { IsInt, Min } from "class-validator";

export class UpdateNotePosisionDto {
  @IsInt()
  @Min(1)
  readonly noteId: number;
  @IsInt()
  @Min(1)
  readonly updatedPositionNumber: number;
}