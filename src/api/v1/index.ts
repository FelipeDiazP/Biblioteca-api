import { Router } from "express";
import authorRoutes from "../../modules/author/author.routes";
import booksRoutes from "../../modules/book/book.routes"

const router = Router();

router.use("/authors", authorRoutes);
router.use("/books", booksRoutes)

export default router;
