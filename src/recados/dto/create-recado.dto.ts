//o DTO basicamente é o data transfer object nele a gente consegue definir o tipo
// para os dados de cadastro, o mesmo vai ser usado por exemplo no lugar no body: any

import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  readonly de: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  readonly para: string;
}
// no dto usamos apenas as classes extritamente necessarias
// o decorator IsString, é advindo do class-validator, esse decorator tbm aceita
// algumas configs