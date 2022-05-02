import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateLivroUseCase } from "./CreateLivroUseCase";

class CreateLivroController {
  async handle(request: Request, response: Response): Promise<Response> {
    const livroRequest = request.body;

    const createLivroUseCase = container.resolve(CreateLivroUseCase);

    const livroResponse = await createLivroUseCase.execute(livroRequest);

    return response.status(201).json(livroResponse);
  }
}

export { CreateLivroController };
