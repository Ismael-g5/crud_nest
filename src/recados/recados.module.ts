import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recados.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils, RecadosUtilsMock } from './recados.utils';
import { SERVER_NAME } from 'src/recados/entities/server-name.contant';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';
import { RegexProtocol } from 'src/common/regex/regex.protocol';
import { REMOVE_SPACES_REGEX } from './entities/recados.contants';
import { RegexFactory } from 'src/common/regex/regex.factory';
import { MyDynamicModule } from 'src/my-dynamic/my-dynamic.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]),
  forwardRef(() => PessoasModule),
  MyDynamicModule.register({
    apiKey: 'Aqui vem a API KEY',
    apiUrl: 'Aqui é a URL da API'
  })],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    RemoveSpacesRegex,
    RegexFactory,

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
    },
    {
      provide: REMOVE_SPACES_REGEX,
      useFactory: (regexFactory: RegexFactory ) => {
        return regexFactory.create('RemoveSpacesRegex')

      },// Factory
      inject: [RegexFactory] // O que esta sendo injetado na ordem
    },
   

  ],

  exports: [RecadosUtils, SERVER_NAME]
})
export class RecadosModule { }