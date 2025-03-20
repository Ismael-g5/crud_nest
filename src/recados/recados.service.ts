/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { Recado } from './entities/recados.entity';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Ismael',
      para: 'Miguel',
      lido: false,
      data: new Date(),
    },
  ];

  findAll() {
    return this.recados;
  }

  findOne(id: string) {
    return this.recados.find((item) => item.id === +id); //o sinal de + converte number em string
  }

  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const novoRecado = {
      id,
      ...body,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.recados.push(novoRecado);

    return novoRecado;
  }

 
  update(id: string, body: any) {
    const recadoExistenteIndex = this.recados.findIndex(
      item => item.id === +id,
    );

    if (recadoExistenteIndex >= 0) {
      const recadoExistente = this.recados[recadoExistenteIndex];

      this.recados[recadoExistenteIndex] = {
        ...recadoExistente,
        ...body,
      };
    }
  }


  remove(id: string) {
    const recadoExistenteIndex = this.recados.findIndex(
      item => item.id === +id,
    );

    if(recadoExistenteIndex >= 0){
      this.recados.splice(recadoExistenteIndex, 1)
    }
  }
  hello() {
    return 'Olá Mundo';
  }
}
