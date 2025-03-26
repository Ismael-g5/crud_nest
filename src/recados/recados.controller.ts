/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RecadosService } from './recados.service';
import type { CreateRecadoDto } from './dto/create-recado.dto';
import type { UpdateRecadoDto } from './dto/update-recado.dto';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @Get()
  // o @Query serve para passar parametros de consulta na rota
  findAll(@Query() pagination: any) {
    //recados
    console.log(pagination);
    //return 'Rota para todos os recados';
    return this.recadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(id);
  
  }
  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecadoDto: UpdateRecadoDto) {
    this.recadosService.update(id, updateRecadoDto);
    return this.recadosService.update(id, updateRecadoDto)
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    this.recadosService.remove(id);
    return this.recadosService.remove(id)

  }
}
