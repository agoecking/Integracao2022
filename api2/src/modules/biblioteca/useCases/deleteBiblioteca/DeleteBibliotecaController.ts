import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteBibliotecaUseCase } from "./DeleteBibliotecaUseCase";

class DeleteBibliotecaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const bibliotecaUseCase = container.resolve(DeleteBibliotecaUseCase);

    const deleted = await bibliotecaUseCase.execute(id);

    return response.status(200).json(deleted);
  }
}

export { DeleteBibliotecaController };
