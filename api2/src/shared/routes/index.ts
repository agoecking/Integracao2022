import { Router } from "express";

import { bibliotecaRoutes } from "../../modules/biblioteca/routes/biblioteca.routes";
import { livroRoutes } from "../../modules/livro/routes/livro.routes";

const router = Router();

router.use("/biblioteca", bibliotecaRoutes);
router.use("/livro", livroRoutes);

export { router };
