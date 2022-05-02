import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowBibliotecaUserCase } from "./ShowBibliotecaUseCase";

class ShowBibliotecaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const showBiblioteca = container.resolve(ShowBibliotecaUserCase);

    const data = await showBiblioteca.execute(id);

    return response.status(200).json(data);
  }
}

export { ShowBibliotecaController };
