import { IBibliotecaDTO } from "modules/biblioteca/DTOS/IBibliotecaDTO";
import { ILivroDTO } from "modules/livro/DTOS/ILivroDTO";
import {
  Repository,
  getRepository,
  DeleteResult,
} from "typeorm";

import { Biblioteca } from "../../../../database/schemas/Biblioteca";
import { ICreateBibliotecaDTO } from "../../DTOS/ICreateBibliotecaDTO";
import { IBibliotecaRepository } from "../../repositories/IBibliotecaRepository";

class BibliotecaRepository implements IBibliotecaRepository {
  private repository: Repository<Biblioteca>;

  constructor() {
    this.repository = getRepository(Biblioteca);
  }
  async addLivroOnBiblioteca(bibliotecaId: string, livro: ILivroDTO): Promise<IBibliotecaDTO> {
    const biblioteca = await this.repository.findOne(bibliotecaId, { relations: ['livros'] });
    biblioteca.livros.push(livro);
    return this.repository.save(biblioteca);
  }

  async deleteLivroFromBiblioteca(bibliotecaId: number, livroId: number): Promise<IBibliotecaDTO> {
    const biblioteca = await this.repository.findOne(bibliotecaId, { relations: ['livros'] });
    biblioteca.livros = biblioteca.livros.filter(
      it => it.id !== livroId
    );
    return this.repository.save(biblioteca);
  }

  async findAll(): Promise<IBibliotecaDTO[]> {
    const allBibliotecas = await this.repository.find({ relations: ['livros'] });
    return allBibliotecas;
  }

  async createBiblioteca(biblioteca: ICreateBibliotecaDTO): Promise<IBibliotecaDTO> {
    const bibliotecaCreated = await this.repository.create(biblioteca);
    await this.repository.save(bibliotecaCreated);
    return bibliotecaCreated;
  }

  async findById(id: string | number): Promise<IBibliotecaDTO> {
    const biblioteca = await this.repository.findOne(id, { relations: ['livros'] });
    return biblioteca;
  }

  async update(
    id: string | number,
    biblioteca: Omit<IBibliotecaDTO, "id">,
  ): Promise<IBibliotecaDTO> {
    await this.repository.update(id, biblioteca);
    return this.repository.findOne(id, { relations: ['livros'] });
  }

  async delete(id: string | number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

export { BibliotecaRepository };
