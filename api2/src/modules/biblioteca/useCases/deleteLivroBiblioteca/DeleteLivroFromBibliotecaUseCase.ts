import { inject, injectable } from "tsyringe";

import { ICreateBibliotecaDTO } from "../../DTOS/ICreateBibliotecaDTO";
import { IBibliotecaRepository } from "../../repositories/IBibliotecaRepository";
import { IBibliotecaDTO } from "modules/biblioteca/DTOS/IBibliotecaDTO";
import { IDeleteLivroToBiblioteca } from "modules/biblioteca/DTOS/IDeleteLivroToBibliotecaDTO";
import { ILivroRepository } from "../../../livro/repositories/ILivroRepository";
import { AppError } from "../../../../shared/errors/AppError";

import request from "axios";

@injectable()
class DeleteLivroFromBibliotecaUseCase {
  constructor(
    @inject("BibliotecaRepository")
    private bibliotecaRepository: IBibliotecaRepository,
    @inject("LivroRepository")
    private livroRepository: ILivroRepository,
  ) {}

  async execute(resquestToAdd: IDeleteLivroToBiblioteca): Promise<IBibliotecaDTO> {
    const { bibliotecaId, livroId } = resquestToAdd;

    const livroExist = await this.livroRepository.findById(livroId);
    if(!livroExist) throw new AppError("Livro não existe na base de dados !");

    const bibliotecaExist = await this.bibliotecaRepository.findById(bibliotecaId);
    if(!bibliotecaExist) throw new AppError("Biblioteca não existe !");

    const bibliotecaUpdated = await this.bibliotecaRepository
      .deleteLivroFromBiblioteca(parseInt(bibliotecaId), livroExist.id);

    this.sendMail(livroExist.isbn, "REMOVIDO", bibliotecaUpdated.nome);

    return bibliotecaUpdated;
  }

  async sendMail(isbn: string, type: string, bibliotecaNome: string) {
    await request.post(`${process.env.API2_URL}/sendMail`, { ISBN: isbn, type: `${type} - ${bibliotecaNome}` })
  };
}

export { DeleteLivroFromBibliotecaUseCase };
