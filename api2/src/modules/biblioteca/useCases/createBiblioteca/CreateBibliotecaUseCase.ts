import { inject, injectable } from "tsyringe";

import { ICreateBibliotecaDTO } from "../../DTOS/ICreateBibliotecaDTO";
import { IBibliotecaRepository } from "../../repositories/IBibliotecaRepository";
import { IBibliotecaDTO } from "modules/biblioteca/DTOS/IBibliotecaDTO";

@injectable()
class CreateBibliotecaUseCase {
  constructor(
    @inject("BibliotecaRepository")
    private bibliotecaRepository: IBibliotecaRepository,
  ) {}

  async execute(biblioteca: ICreateBibliotecaDTO): Promise<IBibliotecaDTO> {
    const biblitecaCreated = await this.bibliotecaRepository.createBiblioteca(biblioteca);
    return biblitecaCreated;
  }
}

export { CreateBibliotecaUseCase };
