import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthPayloadDTO {
  @IsNotEmpty({ message: 'Usuário é obrigatório' })
  @IsString({
    message: 'Nome do usuário deve ser composto por um conjunto de caracteres',
  })
  username: string;

  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsString()
  @Length(8, 32, {
    message: 'A senha deve ter no minimo 8 e no máximo 32 caracteres',
  })
  password: string;
}
