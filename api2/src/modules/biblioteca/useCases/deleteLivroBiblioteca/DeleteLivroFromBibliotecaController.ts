import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteLivroFromBibliotecaUseCase } from "./DeleteLivroFromBibliotecaUseCase";

class DeleteLivroFromBibliotecaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { bibliotecaId, livroId } = request.params;

    const deleteLivroFromBibliotecaUseCase = container.resolve(DeleteLivroFromBibliotecaUseCase);

    const environment = await deleteLivroFromBibliotecaUseCase.execute({ bibliotecaId, livroId });

    return response.status(200).json(environment);
  }
}

export { DeleteLivroFromBibliotecaController };
