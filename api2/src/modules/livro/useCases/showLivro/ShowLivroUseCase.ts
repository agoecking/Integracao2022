import { Livro } from "../../../../database/schemas/Livro";
import { inject, injectable } from "tsyringe";

import { ILivroRepository } from "../../repositories/ILivroRepository";

@injectable()
class ShowLivroUserCase {
  constructor(
    @inject("LivroRepository")
    private livroRepository: ILivroRepository,
  ) {}
  async execute(id: string, isbn: string): Promise<Livro | Livro[]> {
    const response = id || isbn
      ? id ? await this.livroRepository.findById(id) : this.livroRepository.findByISBN(isbn)
      : await this.livroRepository.findAll();

    return response;
  }
}

export { ShowLivroUserCase };
