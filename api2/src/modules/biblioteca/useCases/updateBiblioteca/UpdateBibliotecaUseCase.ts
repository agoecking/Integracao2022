import { IBibliotecaDTO } from "modules/biblioteca/DTOS/IBibliotecaDTO";
import { inject, injectable } from "tsyringe";

import { ICreateBibliotecaDTO } from "../../DTOS/ICreateBibliotecaDTO";
import { IBibliotecaRepository } from "../../repositories/IBibliotecaRepository";

interface IRequest extends ICreateBibliotecaDTO {
  id: string;
}

@injectable()
class UpdateBibliotecaUseCase {
  constructor(
    @inject("BibliotecaRepository")
    private bibliotecaRepository: IBibliotecaRepository,
  ) {}

  async execute(biblioteca: IRequest): Promise<IBibliotecaDTO> {
    const bibliotecaUpdated = await this.bibliotecaRepository.update(biblioteca.id, biblioteca);
    return bibliotecaUpdated;
  }
}

export { UpdateBibliotecaUseCase };
