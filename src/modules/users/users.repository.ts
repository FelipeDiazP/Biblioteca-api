import { Collection, ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { User } from "./users.model";

export class UserRepository {

  private collection(): Collection<User> {
    return getDb().collection<User>("users");
  }

  async create(data: Omit<User, "_id">): Promise<User> {

    const result = await this.collection().insertOne(
      data as User
    );

    return {
      _id: result.insertedId,
      ...data
    };
  }

  async findAll(): Promise<User[]> {

    return await this.collection()
      .find()
      .toArray();
  }

  async findById(id: string): Promise<User | null> {

    if (!ObjectId.isValid(id)) {
      return null;
    }

    return await this.collection().findOne({
      _id: new ObjectId(id)
    });
  }

  async findByEmail(email: string): Promise<User | null> {

    return await this.collection().findOne({
      email
    });
  }

  async update(
    id: string,
    data: Partial<Omit<User, "_id">>
  ): Promise<User | null> {

    if (!ObjectId.isValid(id)) {
      return null;
    }

    const result = await this.collection().findOneAndUpdate(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          ...data,
          updatedAt: new Date()
        }
      },
      {
        returnDocument: "after"
      }
    );

    return result;
  }

  async delete(id: string): Promise<boolean> {

    if (!ObjectId.isValid(id)) {
      return false;
    }

    const result = await this.collection().deleteOne({
      _id: new ObjectId(id)
    });

    return result.deletedCount > 0;
  }
}
