export interface ILivroDTO {
    id: number;
    isbn: string;
    nome: string;
    descricao: string;
    img: string;
    preco: Number;
    moeda: string;
    paginas: Number;
    language: string;
    created_at: Date;
    updated_at: Date;
}