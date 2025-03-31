import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number; // automatico sequencial 1 2 3 4 5 ...
  
  @Column({type: 'varchar', length: 255}) // sem valores dentro de Column vai passar como texto
  texto: string;

  @Column({type: 'varchar', length: 50})
  de: string;
  
  @Column({type: 'varchar', length: 50})
  para: string;

  @Column({default: false})
  lido: boolean;

  @Column()
  data: Date;
  
  @CreateDateColumn()
  createdAt?: Date;
  
  @UpdateDateColumn()
  updatedAt?: Date;
}
