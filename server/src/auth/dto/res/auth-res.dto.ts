import { Expose } from "class-transformer";

export class AuthResDto {
  @Expose()
  readonly accessToken: string;
}