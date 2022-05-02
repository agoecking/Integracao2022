import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowLivroUserCase } from "./ShowLivroUseCase";

class ShowLivroController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;
    const isbn = request.query.isbn as string;

    const showLivro = container.resolve(ShowLivroUserCase);

    const data = await showLivro.execute(id, isbn);

    return response.status(200).json(data);
  }
}

export { ShowLivroController };
