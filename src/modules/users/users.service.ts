import { BadRequestError } from "../../shared/errors/AppError";
import { User, UserDTO } from "./users.model";
import { UserRepository } from "./users.repository";


export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data: UserDTO): Promise<User> {

        if (!data.name || typeof data.name !== "string") {
            throw new BadRequestError(
                "El campo 'name' es obligatorio"
            );
        }

        if (!data.email || typeof data.email !== "string") {
            throw new BadRequestError(
                "El campo 'email' es obligatorio"
            );
        }

        if (!data.phone || typeof data.phone !== "string") {
            throw new BadRequestError(
                "El campo 'phone' es obligatorio"
            );
        }

        const name = data.name.trim();
        const email = data.email.trim().toLowerCase();
        const phone = data.phone.trim();

        if (!name) {
            throw new BadRequestError(
                "El campo 'name' no puede estar vacío"
            );
        }

        if (!phone) {
            throw new BadRequestError(
                "El campo 'phone' no puede estar vacío"
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new BadRequestError(
                "El campo 'email' no tiene un formato válido"
            );
        }

        const existingUser =
            await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new BadRequestError(
                `El correo '${email}' ya está registrado`
            );
        }

        const now = new Date();

        return await this.userRepository.create({
            name,
            email,
            phone,
            createdAt: now,
            updatedAt: now
        });
    }

    async findAll(): Promise<User[]> {

        return await this.userRepository.findAll();
    }

    async findById(id: string): Promise<User> {

        if (!id) {
            throw new BadRequestError(
                "El ID del usuario es obligatorio"
            );
        }

        const user =
            await this.userRepository.findById(id);

        if (!user) {
            throw new BadRequestError(
                "El usuario no existe"
            );
        }

        return user;
    }

    async update(
        id: string,
        data: Partial<UserDTO>
    ): Promise<User> {

        if (!id) {
            throw new BadRequestError(
                "El ID del usuario es obligatorio"
            );
        }

        if (data.name !== undefined) {

            if (typeof data.name !== "string") {
                throw new BadRequestError(
                    "El campo 'name' debe ser un texto"
                );
            }

            data.name = data.name.trim();

            if (!data.name) {
                throw new BadRequestError(
                    "El campo 'name' no puede estar vacío"
                );
            }
        }

        if (data.phone !== undefined) {

            if (typeof data.phone !== "string") {
                throw new BadRequestError(
                    "El campo 'phone' debe ser un texto"
                );
            }

            data.phone = data.phone.trim();

            if (!data.phone) {
                throw new BadRequestError(
                    "El campo 'phone' no puede estar vacío"
                );
            }
        }

        if (data.email !== undefined) {

            if (typeof data.email !== "string") {
                throw new BadRequestError(
                    "El campo 'email' debe ser un texto"
                );
            }

            const email = data.email.trim().toLowerCase();

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                throw new BadRequestError(
                    "El campo 'email' no tiene un formato válido"
                );
            }

            const existingUser =
                await this.userRepository.findByEmail(email);

            if (
                existingUser &&
                existingUser._id?.toString() !== id
            ) {
                throw new BadRequestError(
                    `El correo '${email}' ya está registrado`
                );
            }

            data.email = email;
        }

        const user =
            await this.userRepository.update(id, data);

        if (!user) {
            throw new BadRequestError(
                "El usuario no existe"
            );
        }

        return user;
    }

    async delete(id: string): Promise<void> {

        if (!id) {
            throw new BadRequestError(
                "El ID del usuario es obligatorio"
            );
        }

        const deleted =
            await this.userRepository.delete(id);

        if (!deleted) {
            throw new BadRequestError(
                "El usuario no existe"
            );
        }
    }
}