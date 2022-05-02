import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateBibliotecaUseCase } from "./UpdateBibliotecaUseCase";

class UpdateBibliotecaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const biblioteca = request.body;

    const updateBibliotecaUseCase = container.resolve(UpdateBibliotecaUseCase);

    const bibliotecaResponse = await updateBibliotecaUseCase.execute(biblioteca);

    return response.status(200).json(bibliotecaResponse);
  }
}

export { UpdateBibliotecaController };
