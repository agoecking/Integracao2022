import { Router } from "express";

import { DeleteLivroController } from "../useCases/deleteLivro/DeleteLivroController";
import { CreateLivroController } from "../useCases/createLivro/CreateLivroController";
import { ShowLivroController } from "../useCases/showLivro/ShowLivroController";

const livroRoutes = Router();

const createLivroController = new CreateLivroController();
const deleteLivroController = new DeleteLivroController();
const showLivroController = new ShowLivroController();

livroRoutes.get("/", showLivroController.handle);
livroRoutes.post("/", createLivroController.handle);
livroRoutes.delete("/:id", deleteLivroController.handle);

export { livroRoutes };
