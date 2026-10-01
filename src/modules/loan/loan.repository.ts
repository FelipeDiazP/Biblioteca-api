import { Collection, ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Loan } from "./loan.model";


export class LoanRepository {
  private collection(): Collection<Loan> {
    return getDb().collection<Loan>("loans");
  }

  async create(data: Omit<Loan, "_id">): Promise<Loan> {
    const result = await this.collection().insertOne(data as Loan);

    return {
      _id: result.insertedId,
      ...data,
    };
  }

  async findAll(): Promise<Loan[]> {
    return await this.collection().find().toArray();
  }

  async findById(id: string): Promise<Loan | null> {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    return await this.collection().findOne({
      _id: new ObjectId(id),
    });
  }

  async update(
    id: string,
    data: Partial<Omit<Loan, "_id">>,
  ): Promise<Loan | null> {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const result = await this.collection().findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: "after",
      },
    );

    return result;
  }

  async delete(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
      return false;
    }

    const result = await this.collection().deleteOne({
      _id: new ObjectId(id),
    });

    return result.deletedCount > 0;
  }
}