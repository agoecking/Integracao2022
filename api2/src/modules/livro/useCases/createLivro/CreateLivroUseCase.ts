import { inject, injectable } from "tsyringe";

import { ICreateLivroDTO } from "../../DTOS/ICreateLivroDTO";
import { ILivroRepository } from "../../repositories/ILivroRepository";
import { ILivroDTO } from "modules/livro/DTOS/ILivroDTO";
import { ICreateLivroRequestDTO } from "modules/livro/DTOS/ICreateLivroResquestDTO";
import { AppError } from "../../../../shared/errors/AppError";

import request from "request";
import util from "util";
const requestPromise = util.promisify(request);

@injectable()
class CreateLivroUseCase {
  constructor(
    @inject("LivroRepository")
    private livroRepository: ILivroRepository,
  ) {}

  async execute(livroRequest: ICreateLivroRequestDTO): Promise<ILivroDTO> {

    const isbn = livroRequest.isbn;

    const livroExist = await this.livroRepository.findByISBN(isbn);

    if(livroExist) throw new AppError("Livro ja cadastrado !");

    const livroResponse = await this.createLivro(isbn);

    return livroResponse;
  }

  async createLivro(isbn: string): Promise<ILivroDTO> {
    const url = `${process.env.API3_URL}/book?isbn=${isbn}`;

    const urlSettings = {
      rejectUnauthorized: false,
      url,
      headers:  {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
      },
    };

    const livroFromGoogleAPIResponse = await requestPromise(urlSettings);
    const livroFromGoogleAPI = JSON.parse(livroFromGoogleAPIResponse.body);
    
    if(!livroFromGoogleAPI) throw new AppError("ISBN não existe esse livro");

    const {
      nome,
      img,
      preco,
      language,
      paginas,
      moeda
    } = livroFromGoogleAPI;

    const newLivro: ICreateLivroDTO = {
      isbn,
      nome,
      descricao: '',
      img,
      preco,
      language,
      paginas,
      moeda
    };

    const livroCreated = await this.livroRepository.createLivro(newLivro);

    return livroCreated;
  }
}

export { CreateLivroUseCase };
