import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  readonly password: string;
}