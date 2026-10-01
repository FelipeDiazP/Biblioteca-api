import { Router } from "express";
import { UserController } from "./users.controller";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";

const router = Router();

const controller = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Crear un usuario
 *     description: Crea un nuevo usuario en la biblioteca.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre completo del usuario
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *                 example: juan.perez@gmail.com
 *               phone:
 *                 type: string
 *                 description: Número telefónico del usuario
 *                 example: "3001234567"
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos o correo ya registrado
 */
router.post("/", asyncHandler(controller.create));

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene la lista completa de usuarios registrados.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 */
router.get("/", asyncHandler(controller.findAll));

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Busca un usuario específico mediante su ID de MongoDB.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *         example: 68d4a123456789abcdef1234
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *       400:
 *         description: El usuario no existe o el ID no es válido
 */
router.get("/:id", asyncHandler(controller.findById));

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Actualiza los datos de un usuario existente.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *         example: 68d4a123456789abcdef1234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del usuario
 *                 example: Juan Carlos Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Nuevo correo electrónico
 *                 example: juancarlos@gmail.com
 *               phone:
 *                 type: string
 *                 description: Nuevo número telefónico
 *                 example: "3109876543"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos o usuario no encontrado
 */
router.put("/:id", asyncHandler(controller.update));

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario mediante su ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario que se desea eliminar
 *         schema:
 *           type: string
 *         example: 68d4a123456789abcdef1234
 *     responses:
 *       204:
 *         description: Usuario eliminado correctamente
 *       400:
 *         description: El usuario no existe o el ID no es válido
 */
router.delete("/:id", asyncHandler(controller.delete));

export default router;
