import { Expose, Transform } from "class-transformer";

export class AddNoteResDto {
  @Expose()
  @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
  readonly createdAt: string; 

  @Expose()
  @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
  readonly updatedAt: string;
}