import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddLivroToBibliotecaUseCase } from "./AddLivroToBibliotecaUseCase";

class AddLivroToBibliotecaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { bibliotecaId, livroId } = request.params;

    const addLivroToBibliotecaUseCase = container.resolve(AddLivroToBibliotecaUseCase);

    const environment = await addLivroToBibliotecaUseCase.execute({ bibliotecaId, livroId });

    return response.status(200).json(environment);
  }
}

export { AddLivroToBibliotecaController };
