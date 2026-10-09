import { ObjectId } from "mongodb";
import { Genres, GenresDTO } from "./geners.model";
import { GenersRepository } from "./geners.repository";
import { BadRequestError, NotFoundError } from "../../shared/errors/AppError";
import { getDb } from "../../config/database";

export class GenersService {
    private readonly genersRepository = new GenersRepository();

    async create(data: GenresDTO): Promise<Genres> {
        const name = this.requireString(data?.name, "name");
        const description = this.requireString(data?.description, "description");

        const geners = await getDb().collection("geners");

        const name = this.requireString(data?.name, "name");

        const now = new Date();
        return this.genersRepository.create({
            name,
            description,
            createdAt: now,
            updatedAt: now,
        });
    }

    async findAll(available?: string): Promise<Genres[]> {
        const filter: Record<string, unknown> = {};
        if (available !== undefined) {
            filter.available = available === "true";
        }
        return this.genersRepository.findAll(filter);
    }

    async update(id: string, data: GenresDTO): Promise<Genres> {
        const objectId = this.toObjectId(id);
        const changes: Partial<Genres> = {};

        if (data.name !== undefined) changes.name = this.requireString(data.name, "name");
        if (data.description !== undefined) changes.description = this.requireString(data.description, "description");
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.genersRepository.delete(this.toObjectId(id));
        if (!deleted) throw new NotFoundError("Libro no encontrado");
    }

    private requireString(value: unknown, field: string): string {
        if (typeof value !== "string" || value.trim() === "") {
            throw new BadRequestError(`El campo '${field}' es obligatorio`);
        }
        return value.trim();
    }

    private toObjectId(id: string): ObjectId {
        if (!ObjectId.isValid(id)) throw new BadRequestError(`Identificador inválido: ${id}`);
        return new ObjectId(id);
    }
}