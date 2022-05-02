import {
  Repository,
  getRepository,
  DeleteResult,
} from "typeorm";

import { Livro } from "../../../../database/schemas/Livro";
import { ICreateLivroDTO } from "../../DTOS/ICreateLivroDTO";
import { ILivroRepository } from "../../repositories/ILivroRepository";

class LivroRepository implements ILivroRepository {
  private repository: Repository<Livro>;

  constructor() {
    this.repository = getRepository(Livro);
  }

  findAll(): Promise<Livro[]> {
    const allLivros = this.repository.find({});
    return allLivros;
  }

  async createLivro(biblioteca: ICreateLivroDTO): Promise<Livro> {
    const bibliotecaCreated = this.repository.create(biblioteca);

    await this.repository.save(bibliotecaCreated);
    return bibliotecaCreated;
  }

  async findById(id: string | number): Promise<Livro> {
    const biblioteca = await this.repository.findOne(id);
    return biblioteca;
  }

  async update(
    id: string | number,
    biblioteca: Omit<Livro, "id" | "created_at" | "updated_at">,
  ): Promise<Livro> {
    await this.repository.update(id, biblioteca);
    return this.repository.findOne(id);
  }

  async delete(id: string | number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async findByISBN(isbn: string): Promise<Livro> {
    return this.repository.findOne({ isbn });
  }
}

export { LivroRepository };
