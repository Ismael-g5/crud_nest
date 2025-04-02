import { IsEmail } from "class-validator";
import { Recado } from "src/recados/entities/recados.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({unique: true})
  @IsEmail() 
  email: string;
  
  @Column({length: 255})
  passwordHash: string;
  
  @Column({length: 100})
  nome: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  //relações banco de dados
  @OneToMany(() => Recado, recado => recado.de)
  recadoEnviados: Recado[];

  @OneToMany(() => Recado, recado => recado.para)
  recadoRecebidos: Recado[];
}
