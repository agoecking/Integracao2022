import { DeleteResult } from "typeorm";

import { Livro } from "../../../database/schemas/Livro";
import { ICreateLivroDTO } from "../DTOS/ICreateLivroDTO";

export interface ILivroRepository {
  createLivro(data: ICreateLivroDTO): Promise<Livro>;
  findById(id: string | number): Promise<Livro>;
  findByISBN(isbn: string): Promise<Livro>;
  update(id: string | number, biblioteca: Omit<Livro, "id" | "created_at" | "updated_at">): Promise<Livro>;
  delete(id: string | number): Promise<DeleteResult>;
  findAll(): Promise<Livro[]>;
}
