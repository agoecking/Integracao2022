import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn
} from "typeorm";
import { Biblioteca } from "./Biblioteca";

@Entity()
class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  isbn: string;

  @Column()
  descricao: string;

  @Column()
  img: string;

  @Column()
  preco: Number;

  @Column()
  moeda: string;

  @Column()
  paginas: Number;

  @Column()
  language: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Livro };
