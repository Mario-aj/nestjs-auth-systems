import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class AuthDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 32, { message: 'Password must be between 8 and 32 characters' })
  public password: string;
}
