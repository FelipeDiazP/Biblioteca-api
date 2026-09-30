import { Router } from "express";
import authorRoutes from "../../modules/author/author.routes";

const router = Router();

router.use("/authors", authorRoutes);

export default router;
