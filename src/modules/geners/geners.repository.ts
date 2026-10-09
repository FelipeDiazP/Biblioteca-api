import { Collection, ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Genres } from "./geners.model";

export class GenersRepository {
    private collection(): Collection<Genres> {
        return getDb().collection<Genres>("geners");
    }

    async create(data: Omit<Genres, "_id">): Promise<Genres> {
        const result = await this.collection().insertOne(data as Genres);
        return { _id: result.insertedId, ...data };
    }

    async findAll(filter: Record<string, unknown> = {}): Promise<Genres[]> {
        return this.collection().find(filter).sort({ createdAt: -1 }).toArray();
    }

    async findById(id: ObjectId): Promise<Genres | null> {
        return this.collection().findOne({ _id: id });
    }

    async findByIsbn(isbn: string): Promise<Genres | null> {
        return this.collection().findOne({ isbn });
    }

    async update(id: ObjectId, changes: Partial<Genres>): Promise<Genres | null> {
        const result = await this.collection().findOneAndUpdate(
            { _id: id },
            { $set: changes },
            { returnDocument: "after" }
        );
        return result ?? null;
    }

    async delete(id: ObjectId): Promise<boolean> {
        const result = await this.collection().deleteOne({ _id: id });
        return result.deletedCount === 1;
    }
}