import { Router } from "express";

import { DeleteBibliotecaController } from "../useCases/deleteBiblioteca/DeleteBibliotecaController";
import { CreateBibliotecaController } from "../useCases/createBiblioteca/CreateBibliotecaController";
import { UpdateBibliotecaController } from "../useCases/updateBiblioteca/UpdateBibliotecaController";
import { ShowBibliotecaController } from "../useCases/showBiblioteca/ShowBibliotecaController";
import { AddLivroToBibliotecaController } from "../useCases/addLivroToBiblioteca/AddLivroToBibliotecaController";
import { DeleteLivroFromBibliotecaController } from "../useCases/deleteLivroBiblioteca/DeleteLivroFromBibliotecaController";

const bibliotecaRoutes = Router();

const deleteLivroFromBiblioteca = new DeleteLivroFromBibliotecaController();
const createBibliotecaController = new CreateBibliotecaController();
const updateBibliotecaController = new UpdateBibliotecaController();
const deleteBibliotecaController = new DeleteBibliotecaController();
const addLivroToBiblioteca = new AddLivroToBibliotecaController();
const showBibliotecaController = new ShowBibliotecaController();

bibliotecaRoutes.get("/", showBibliotecaController.handle);
bibliotecaRoutes.post("/", createBibliotecaController.handle);
bibliotecaRoutes.put("/", updateBibliotecaController.handle);
bibliotecaRoutes.delete("/:id", deleteBibliotecaController.handle);

bibliotecaRoutes.post("/:bibliotecaId/livro/:livroId", addLivroToBiblioteca.handle);
bibliotecaRoutes.delete("/:bibliotecaId/livro/:livroId", deleteLivroFromBiblioteca.handle);

export { bibliotecaRoutes };
