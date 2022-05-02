import { IBibliotecaDTO } from "modules/biblioteca/DTOS/IBibliotecaDTO";
import { inject, injectable } from "tsyringe";

import { IBibliotecaRepository } from "../../repositories/IBibliotecaRepository";

@injectable()
class ShowBibliotecaUserCase {
  constructor(
    @inject("BibliotecaRepository")
    private bibliotecaRepository: IBibliotecaRepository,
  ) {}
  async execute(id: string): Promise<IBibliotecaDTO | IBibliotecaDTO[]> {
    const response = id
      ? await this.bibliotecaRepository.findById(id)
      : await this.bibliotecaRepository.findAll();

    return response;
  }
}

export { ShowBibliotecaUserCase };
