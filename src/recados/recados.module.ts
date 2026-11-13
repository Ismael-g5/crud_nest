import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recados.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils, RecadosUtilsMock } from './recados.utils';
import { SERVER_NAME } from 'src/common/constants/server-name.contant';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';
import { RegexProtocol } from 'src/common/regex/regex.protocol';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]),
  forwardRef(()=> PessoasModule)],
  controllers: [RecadosController],
  providers: [RecadosService,
    {
      provide: RecadosUtils, // Token
      //useClass: RecadosUtils // Classe que vai ser usada
      useValue: new RecadosUtilsMock(), // valor a ser usado
    },
    {
      provide: SERVER_NAME,
      useValue: 'My Name is NestJS'
    },
    {
      provide: RegexProtocol,
      useClass: 1 === 1 ? RemoveSpacesRegex : OnlyLowercaseLettersRegex
    }

  ],
 
  exports: [RecadosUtils, SERVER_NAME]
})
export class RecadosModule { }