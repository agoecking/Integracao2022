import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteLivroUseCase } from "./DeleteLivroUseCase";

class DeleteLivroController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const livroUseCase = container.resolve(DeleteLivroUseCase);

    const deleted = await livroUseCase.execute(id);

    return response.status(200).json(deleted);
  }
}

export { DeleteLivroController };
