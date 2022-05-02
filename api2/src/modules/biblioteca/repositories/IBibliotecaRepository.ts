import { ILivroDTO } from "modules/livro/DTOS/ILivroDTO";
import { DeleteResult } from "typeorm";

import { IBibliotecaDTO } from "../DTOS/IBibliotecaDTO";
import { ICreateBibliotecaDTO } from "../DTOS/ICreateBibliotecaDTO";

export interface IBibliotecaRepository {
  createBiblioteca(data: ICreateBibliotecaDTO): Promise<IBibliotecaDTO>;
  findById(id: string | number): Promise<IBibliotecaDTO>;
  update(id: string | number, biblioteca: Omit<IBibliotecaDTO, "id" | "created_at" | "updated_at" | "livros">): Promise<IBibliotecaDTO>;
  addLivroOnBiblioteca(bibliotecaId: string, livro: ILivroDTO): Promise<IBibliotecaDTO>;
  deleteLivroFromBiblioteca(bibliotecaId: number, livroId: number): Promise<IBibliotecaDTO>;
  delete(id: string): Promise<DeleteResult>;
  findAll(): Promise<IBibliotecaDTO[]>;
}
