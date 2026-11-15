import { urlParam } from '../common/params/url-params.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  Inject
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
import { Request } from 'express';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';
import { ReqDataParam } from 'src/common/params/rer-params.decorator';
import { RecadosUtils } from './recados.utils';
//import { SERVER_NAME } from 'src/recados/entities/server-name.contant';
import type { RegexProtocol } from 'src/common/regex/regex.protocol';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { REMOVE_SPACES_REGEX } from './entities/recados.contants';
import type { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';

// CRUD
// Create -> POST -> Criar um recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um recado
// Update -> PATCH / PUT -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATCH é utilizado para atualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

// DTO - Data Transfer Object -> Objeto de transferência de dados
// DTO -> Objeto simples -> Validar dados / Transformar dados

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    private readonly recadosUtils: RecadosUtils,
    //private readonly removeSpacesRegex: RegexProtocol, ou
    @Inject(REMOVE_SPACES_REGEX)
    private readonly removeSpacesRegex: RemoveSpacesRegex,

    @Inject('ONLY_LOWERCASE_LETTERS_REGEX')
    private readonly onlyLowercaseLettersRegex: OnlyLowercaseLettersRegex,
    
  //  @Inject(SERVER_NAME) // aqui precisamos passar o inject com o valor do provide
    // no .module
    //private readonly serverName: string,

  ) { }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto,
  
  @ReqDataParam('url') url,

  ) {
    //console.log('RecadosController', req['user']);
    //chamada do url
    console.log(url);

   // console.log(this.serverName);

    console.log(this.removeSpacesRegex.execute('REMOVE OS ESPACOS'))

    const recados = await this.recadosService.findAll(paginationDto);

    return recados;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(+id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}