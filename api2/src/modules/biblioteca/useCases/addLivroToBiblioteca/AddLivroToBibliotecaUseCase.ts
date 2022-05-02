import { inject, injectable } from "tsyringe";

import { ICreateBibliotecaDTO } from "../../DTOS/ICreateBibliotecaDTO";
import { IBibliotecaRepository } from "../../repositories/IBibliotecaRepository";
import { IBibliotecaDTO } from "modules/biblioteca/DTOS/IBibliotecaDTO";
import { IAddLivroToBiblioteca } from "modules/biblioteca/DTOS/IAddLivroToBibliotecaDTO";
import { ILivroRepository } from "../../../../modules/livro/repositories/ILivroRepository";
import { AppError } from "../../../../shared/errors/AppError";

import request from "axios";

@injectable()
class AddLivroToBibliotecaUseCase {
  constructor(
    @inject("BibliotecaRepository")
    private bibliotecaRepository: IBibliotecaRepository,
    @inject("LivroRepository")
    private livroRepository: ILivroRepository,
  ) {}

  async execute(resquestToAdd: IAddLivroToBiblioteca): Promise<IBibliotecaDTO> {
    const { bibliotecaId, livroId } = resquestToAdd;

    const livroExist = await this.livroRepository.findById(livroId);
    if(!livroExist) throw new AppError("Livro não existe na base de dados !");

    const bibliotecaExist = await this.bibliotecaRepository.findById(bibliotecaId);
    if(!bibliotecaExist) throw new AppError("Biblioteca não existe !");

    const livroJaAdicionado = bibliotecaExist.livros.find(it => it.id == parseInt(livroId));
    if(livroJaAdicionado) throw new AppError("Livro ja esta adicionado nesta biblioteca.");

    const bibliotecaUpdated = await this.bibliotecaRepository.addLivroOnBiblioteca(bibliotecaId, livroExist);

    this.sendMail(livroExist.isbn, "ADICIONADO", bibliotecaUpdated.nome);

    return bibliotecaUpdated;
  }

  async sendMail(isbn: string, type: string, bibliotecaNome: string) {
    await request.post(`${process.env.API2_URL}/sendMail`, { ISBN: isbn, type: `${type} - ${bibliotecaNome}` })
  };
}

export { AddLivroToBibliotecaUseCase };
