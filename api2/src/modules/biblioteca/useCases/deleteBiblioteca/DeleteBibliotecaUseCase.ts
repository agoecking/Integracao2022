import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IBibliotecaRepository } from "../../repositories/IBibliotecaRepository";

@injectable()
class DeleteBibliotecaUseCase {
  constructor(
    @inject("BibliotecaRepository")
    private bibliotecaRepository: IBibliotecaRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.bibliotecaRepository.delete(id);
  }
}

export { DeleteBibliotecaUseCase };
