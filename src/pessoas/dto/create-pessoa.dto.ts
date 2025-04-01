import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { Column } from "typeorm";

export class CreatePessoaDto {

  @IsEmail()
  email: string;

  //@Column({length: 255})
 // @IsStrongPassword({
    //validação da senha

  //})
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nome: string;
  
}
