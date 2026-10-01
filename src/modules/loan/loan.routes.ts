import { Router } from "express";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";
import { LoanController } from "./loan.controller";


const router = Router();

const controller = new LoanController();

/**
 * @swagger
 * tags:
 *   name: Loans
 *   description: Gestión de préstamos
 */

/**
 * @swagger
 * /api/v1/loans:
 *   post:
 *     summary: Crear un préstamo
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 68d4a123456789abcdef1234
 *                 description: ID del usuario que solicita el préstamo
 *               bookId:
 *                 type: string
 *                 example: 68d4b987654321abcdef5678
 *                 description: ID del libro que se desea prestar
 *               loanDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-09-30T15:00:00.000Z
 *     responses:
 *       201:
 *         description: Préstamo creado correctamente
 *       400:
 *         description: Datos inválidos o libro no disponible
 *       404:
 *         description: Usuario o libro no encontrado
 */
router.post(
  "/",
  asyncHandler(controller.create),
);

/**
 * @swagger
 * /api/v1/loans:
 *   get:
 *     summary: Obtener todos los préstamos
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: Lista de préstamos
 */
router.get(
  "/",
  asyncHandler(controller.findAll),
);

/**
 * @swagger
 * /api/v1/loans/{id}:
 *   get:
 *     summary: Obtener un préstamo por ID
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68d4c123456789abcdef9999
 *     responses:
 *       200:
 *         description: Préstamo encontrado
 *       404:
 *         description: Préstamo no encontrado
 */
router.get(
  "/:id",
  asyncHandler(controller.findById),
);

/**
 * @swagger
 * /api/v1/loans/{id}/return:
 *   put:
 *     summary: Registrar devolución de un préstamo
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68d4c123456789abcdef9999
 *     responses:
 *       200:
 *         description: Préstamo devuelto correctamente
 *       400:
 *         description: El préstamo ya fue devuelto
 *       404:
 *         description: Préstamo no encontrado
 */
router.put(
  "/:id/return",
  asyncHandler(controller.returnLoan),
);

/**
 * @swagger
 * /api/v1/loans/{id}:
 *   delete:
 *     summary: Eliminar un préstamo
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68d4c123456789abcdef9999
 *     responses:
 *       204:
 *         description: Préstamo eliminado correctamente
 *       404:
 *         description: Préstamo no encontrado
 */
router.delete(
  "/:id",
  asyncHandler(controller.delete),
);

export default router;