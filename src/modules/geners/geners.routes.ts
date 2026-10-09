import { Router } from "express";
import { GenersController } from "./geners.controller";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();
const controller = new GenersController();

/**
 * @swagger
 * tags:
 *   name: geners
 *   description: Gestión de libros de la biblioteca
 */

/**
 * @swagger
 * /api/v1/geners:
 *   post:
 *     summary: Crear un nuevo libro
 *     tags:
 *       - Geners
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - isbn
 *               - authorId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del libro
 *                 example: Cien años de soledad
 *               isbn:
 *                 type: string
 *                 description: ISBN único del libro
 *                 example: "9780307474728"
 *               authorId:
 *                 type: string
 *                 description: ID del autor del libro
 *                 example: "66f123abc456def789"
 *               year:
 *                 type: integer
 *                 description: Año de publicación
 *                 example: 1967
 *               available:
 *                 type: boolean
 *                 description: Indica si el libro está disponible para préstamo
 *                 default: true
 *                 example: true
 *     responses:
 *       201:
 *         description: Libro creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               _id: "66abc123456def789"
 *               title: "Cien años de soledad"
 *               isbn: "9780307474728"
 *               authorId: "66f123abc456def789"
 *               year: 1967
 *               available: true
 *               createdAt: "2026-09-27T15:00:00.000Z"
 *               updatedAt: "2026-09-27T15:00:00.000Z"
 *       400:
 *         description: Datos inválidos o autorId inválido
 *       404:
 *         description: El autor no existe
 *       409:
 *         description: El ISBN ya está registrado
 */
router.post("/", asyncHandler(controller.create));

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Obtener todos los libros
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             example:
 *               - _id: "66abc123456def789"
 *                 title: "Cien años de soledad"
 *                 isbn: "9780307474728"
 *                 authorId: "66f123abc456def789"
 *                 year: 1967
 *                 available: true
 *                 createdAt: "2026-09-27T15:00:00.000Z"
 *                 updatedAt: "2026-09-27T15:00:00.000Z"
 *               - _id: "66abc987654def321"
 *                 title: "El amor en los tiempos del cólera"
 *                 isbn: "9780307389732"
 *                 authorId: "66f123abc456def789"
 *                 year: 1985
 *                 available: true
 *                 createdAt: "2026-09-27T15:05:00.000Z"
 *                 updatedAt: "2026-09-27T15:05:00.000Z"
 */
router.get("/", asyncHandler(controller.findAll));

/**
 * @swagger
 * /api/v1/books/{id}:
 *   put:
 *     summary: Actualizar un libro
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro
 *         schema:
 *           type: string
 *         example: "66abc123456def789"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Cien años de soledad
 *               isbn:
 *                 type: string
 *                 example: "9780307474728"
 *               authorId:
 *                 type: string
 *                 example: "66f123abc456def789"
 *               year:
 *                 type: integer
 *                 example: 1967
 *               available:
 *                 type: boolean
 *                 example: true
 *           example:
 *             title: "Cien años de soledad"
 *             isbn: "9780307474728"
 *             authorId: "66f123abc456def789"
 *             year: 1967
 *             available: true
 *     responses:
 *       200:
 *         description: Libro actualizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               _id: "66abc123456def789"
 *               title: "Cien años de soledad"
 *               isbn: "9780307474728"
 *               authorId: "66f123abc456def789"
 *               year: 1967
 *               available: true
 *               createdAt: "2026-09-27T15:00:00.000Z"
 *               updatedAt: "2026-09-27T16:00:00.000Z"
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Libro o autor no encontrado
 *       409:
 *         description: El ISBN ya está registrado
 */
router.put("/:id", asyncHandler(controller.update));

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Eliminar un libro
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro
 *         schema:
 *           type: string
 *         example: "66abc123456def789"
 *     responses:
 *       204:
 *         description: Libro eliminado correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Libro no encontrado
 */
router.delete("/:id", asyncHandler(controller.delete));

export default router;
