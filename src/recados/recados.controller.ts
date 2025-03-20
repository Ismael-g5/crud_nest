/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RecadosService } from './recados.service';

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
  create(@Body() body: any) {
    return this.recadosService.create(body);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    this.recadosService.update(id, body);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    this.recadosService.remove(id);
  }
}
