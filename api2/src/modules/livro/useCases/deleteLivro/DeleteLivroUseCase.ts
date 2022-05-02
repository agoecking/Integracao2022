import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ILivroRepository } from "../../repositories/ILivroRepository";

@injectable()
class DeleteLivroUseCase {
  constructor(
    @inject("LivroRepository")
    private livroRepository: ILivroRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.livroRepository.delete(id);
  }
}

export { DeleteLivroUseCase };
