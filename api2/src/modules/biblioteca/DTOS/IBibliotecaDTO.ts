import { ILivroDTO } from "modules/livro/DTOS/ILivroDTO";

export interface IBibliotecaDTO {
    id: number;
    nome: string;
    livros?: ILivroDTO[];
    created_at: Date;
    updated_at: Date;
}