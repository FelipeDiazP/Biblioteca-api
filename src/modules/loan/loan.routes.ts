import { Router } from "express";
import { LoanController } from "./loan.controller";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();
const controller = new LoanController();

/**
 * @swagger
 * tags:
 *   name: Loans
 *   description: Gestión de préstamos de libros
 */

/**
 * @swagger
 * /api/v1/loans:
 *   post:
 *     summary: Crear un nuevo préstamo
 *     description: |
 *       Registra un préstamo de un libro.
 *
 *       El libro debe existir y estar disponible.
 *       Después de crear el préstamo, el libro queda marcado como no disponible.
 *     tags:
 *       - Loans
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - userName
 *               - loanDate
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: ID del libro que será prestado
 *                 example: "66abc123456def789"
 *               userName:
 *                 type: string
 *                 description: Nombre de la persona que solicita el préstamo
 *                 example: Juan Pérez
 *               loanDate:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora en la que se realiza el préstamo
 *                 example: "2026-09-27T15:30:00.000Z"
 *               returnDate:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 description: Fecha de devolución. Se asigna cuando el libro es devuelto.
 *                 example: null
 *               returned:
 *                 type: boolean
 *                 description: Indica si el libro ya fue devuelto
 *                 default: false
 *                 example: false
 *     responses:
 *       201:
 *         description: Préstamo creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               _id: "66loan123456789abc"
 *               bookId: "66abc123456def789"
 *               userName: "Juan Pérez"
 *               loanDate: "2026-09-27T15:30:00.000Z"
 *               returnDate: null
 *               returned: false
 *               createdAt: "2026-09-27T15:30:00.000Z"
 *               updatedAt: "2026-09-27T15:30:00.000Z"
 *       400:
 *         description: Datos inválidos o libro no disponible
 *       404:
 *         description: Libro no encontrado
 */
router.post("/", asyncHandler(controller.create));

/**
 * @swagger
 * /api/v1/loans:
 *   get:
 *     summary: Obtener todos los préstamos
 *     tags:
 *       - Loans
 *     responses:
 *       200:
 *         description: Lista de préstamos
 *         content:
 *           application/json:
 *             example:
 *               - _id: "66loan123456789abc"
 *                 bookId: "66abc123456def789"
 *                 userName: "Juan Pérez"
 *                 loanDate: "2026-09-27T15:30:00.000Z"
 *                 returnDate: null
 *                 returned: false
 *                 createdAt: "2026-09-27T15:30:00.000Z"
 *                 updatedAt: "2026-09-27T15:30:00.000Z"
 *               - _id: "66loan987654321xyz"
 *                 bookId: "66abc987654def321"
 *                 userName: "María López"
 *                 loanDate: "2026-09-26T10:00:00.000Z"
 *                 returnDate: "2026-09-27T14:00:00.000Z"
 *                 returned: true
 *                 createdAt: "2026-09-26T10:00:00.000Z"
 *                 updatedAt: "2026-09-27T14:00:00.000Z"
 */
router.get("/", asyncHandler(controller.findAll));

/**
 * @swagger
 * /api/v1/loans/{id}:
 *   get:
 *     summary: Obtener un préstamo por ID
 *     tags:
 *       - Loans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del préstamo
 *         schema:
 *           type: string
 *         example: "66loan123456789abc"
 *     responses:
 *       200:
 *         description: Préstamo encontrado
 *         content:
 *           application/json:
 *             example:
 *               _id: "66loan123456789abc"
 *               bookId: "66abc123456def789"
 *               userName: "Juan Pérez"
 *               loanDate: "2026-09-27T15:30:00.000Z"
 *               returnDate: null
 *               returned: false
 *               createdAt: "2026-09-27T15:30:00.000Z"
 *               updatedAt: "2026-09-27T15:30:00.000Z"
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Préstamo no encontrado
 */
router.get("/:id", asyncHandler(controller.findById));

/**
 * @swagger
 * /api/v1/loans/{id}:
 *   put:
 *     summary: Actualizar un préstamo
 *     description: |
 *       Permite actualizar la información de un préstamo.
 *
 *       Si el préstamo se marca como devuelto, se registra la fecha de devolución
 *       y el libro vuelve a estar disponible.
 *     tags:
 *       - Loans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del préstamo
 *         schema:
 *           type: string
 *         example: "66loan123456789abc"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: ID del libro
 *                 example: "66abc123456def789"
 *               userName:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Juan Pérez
 *               loanDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-27T15:30:00.000Z"
 *               returnDate:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: "2026-09-30T16:00:00.000Z"
 *               returned:
 *                 type: boolean
 *                 example: true
 *           example:
 *             userName: "Juan Pérez"
 *             returned: true
 *             returnDate: "2026-09-30T16:00:00.000Z"
 *     responses:
 *       200:
 *         description: Préstamo actualizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               _id: "66loan123456789abc"
 *               bookId: "66abc123456def789"
 *               userName: "Juan Pérez"
 *               loanDate: "2026-09-27T15:30:00.000Z"
 *               returnDate: "2026-09-30T16:00:00.000Z"
 *               returned: true
 *               createdAt: "2026-09-27T15:30:00.000Z"
 *               updatedAt: "2026-09-30T16:00:00.000Z"
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Préstamo o libro no encontrado
 */
router.put("/:id", asyncHandler(controller.update));

/**
 * @swagger
 * /api/v1/loans/{id}:
 *   delete:
 *     summary: Eliminar un préstamo
 *     tags:
 *       - Loans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del préstamo
 *         schema:
 *           type: string
 *         example: "66loan123456789abc"
 *     responses:
 *       204:
 *         description: Préstamo eliminado correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Préstamo no encontrado
 */
router.delete("/:id", asyncHandler(controller.delete));

export default router;

