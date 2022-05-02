import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateBibliotecaUseCase } from "./CreateBibliotecaUseCase";

class CreateBibliotecaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const biblioteca = request.body;

    const createBibliotecaUseCase = container.resolve(CreateBibliotecaUseCase);

    const environment = await createBibliotecaUseCase.execute(biblioteca);

    return response.status(201).json(environment);
  }
}

export { CreateBibliotecaController };
