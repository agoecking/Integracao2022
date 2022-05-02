import { container } from "tsyringe";

// Repository Biblioteca
import { IBibliotecaRepository } from "../../modules/biblioteca/repositories/IBibliotecaRepository";
import { BibliotecaRepository } from "../../modules/biblioteca/typeorm/repositories/BibliotecaRepository";

// Repository Livro
import { ILivroRepository } from "../../modules/livro/repositories/ILivroRepository";
import { LivroRepository } from "../../modules/livro/typeorm/repositories/LivroRepository";

container.registerSingleton<IBibliotecaRepository>(
  "BibliotecaRepository",
  BibliotecaRepository,
);

container.registerSingleton<ILivroRepository>(
  "LivroRepository",
  LivroRepository,
);
