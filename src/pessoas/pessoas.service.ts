import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import type { Repository } from 'typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,

  ) {}


  throwNotFoundError() {
    throw new NotFoundException('Pessoa não encontrada');
  }


  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const dadosPessoa = {
        nome: createPessoaDto.nome,
        passwordHash: createPessoaDto.password,
        email: createPessoaDto.email,
      };
  
      const novaPessoa = this.pessoaRepository.create(dadosPessoa);
      await this.pessoaRepository.save(novaPessoa);
    } catch(error){
      console.log(error);//, apos isso é so pegar o code do error e sobrescrever
      // a mensagem
      if(error.code === 'ER_DUP_ENTRY'){
        throw new ConflictException('E-mail já está cadastrado')
      }
      throw error;
    }
   
  }

  async findAll() {
    const pessoas = await this.pessoaRepository.find();
    return pessoas;
  }

  async findOne(id: number) {
    //return `This action returns a #${id} pessoa`;

     // const recado = this.recados.find(item => item.id === id);
     const pessoa = await this.pessoaRepository.findOne({
      where: {
        id,
      },
    });

    if (pessoa) return pessoa;

    this.throwNotFoundError();
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    //return `This action updates a #${id} pessoa`;

    const partialUpdatePessoaDto = {
      email: updatePessoaDto?.email,
      password: updatePessoaDto?.password,
      nome: updatePessoaDto?.nome,
    };
    const pessoa = await this.pessoaRepository.preload({
      id,
      ...partialUpdatePessoaDto,
    });

    if (!pessoa) return this.throwNotFoundError();

    await this.pessoaRepository.save(pessoa);

    return pessoa;

  }

  async remove(id: number) {
   
    const pessoa = await this.pessoaRepository.findOneBy({
      id,
    });

    if (!pessoa) return this.throwNotFoundError();

    return this.pessoaRepository.remove(pessoa);
  }

}

