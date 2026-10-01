import { ObjectId } from "mongodb";
import { LoanRepository } from "./loan.repository";
import { BadRequestError, NotFoundError } from "../../shared/errors/AppError";
import { Loan, LoanDTO } from "./loan.model";
import { getDb } from "../../config/database";

export class LoanService {
  private loanRepository: LoanRepository;

  constructor() {
    this.loanRepository = new LoanRepository();
  }

  private requireString(value: unknown, field: string): string {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new BadRequestError(`El campo '${field}' es obligatorio`);
    }

    return value.trim();
  }

  private toObjectId(value: string, field: string): ObjectId {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestError(`El campo '${field}' no contiene un ID válido`);
    }

    return new ObjectId(value);
  }

  async create(data: LoanDTO): Promise<Loan> {
    const bookIdStr = this.requireString(data?.bookId, "bookId");

    const userIdStr = this.requireString(data?.userId, "userId");

    const bookId = this.toObjectId(bookIdStr, "bookId");
    const userId = this.toObjectId(userIdStr, "userId");

    const booksCol = getDb().collection("books");
    const usersCol = getDb().collection("users");

    const user = await usersCol.findOne({
      _id: userId,
    });

    if (!user) {
      throw new NotFoundError("El usuario especificado no existe");
    }

    const book = await booksCol.findOne({
      _id: bookId,
    });

    if (!book) {
      throw new NotFoundError("El libro especificado no existe");
    }

    if (!book.available) {
      throw new BadRequestError(
        "El libro solicitado no está disponible para préstamo",
      );
    }

    const now = new Date();

    let loanDate = now;

    if (data.loanDate) {
      const parsedDate = new Date(data.loanDate);

      if (isNaN(parsedDate.getTime())) {
        throw new BadRequestError(
          "El campo 'loanDate' no contiene una fecha válida",
        );
      }

      loanDate = parsedDate;
    }

    const loan = await this.loanRepository.create({
      bookId,
      userId,
      loanDate,
      returned: false,
      createdAt: now,
      updatedAt: now,
    });

    await booksCol.updateOne(
      {
        _id: bookId,
      },
      {
        $set: {
          available: false,
          updatedAt: now,
        },
      },
    );

    return loan;
  }

  async findAll(): Promise<Loan[]> {
    return await this.loanRepository.findAll();
  }

  async findById(id: string): Promise<Loan> {
    const loan = await this.loanRepository.findById(id);

    if (!loan) {
      throw new NotFoundError("El préstamo no existe");
    }

    return loan;
  }

  async returnLoan(id: string): Promise<Loan> {
    const loan = await this.loanRepository.findById(id);

    if (!loan) {
      throw new NotFoundError("El préstamo no existe");
    }

    if (loan.returned) {
      throw new BadRequestError("El préstamo ya fue devuelto");
    }

    const now = new Date();

    const updatedLoan = await this.loanRepository.update(id, {
      returned: true,
      returnDate: now,
      updatedAt: now,
    });

    if (!updatedLoan) {
      throw new NotFoundError("El préstamo no existe");
    }

    const booksCol = getDb().collection("books");

    await booksCol.updateOne(
      {
        _id: loan.bookId,
      },
      {
        $set: {
          available: true,
          updatedAt: now,
        },
      },
    );

    return updatedLoan;
  }

  async delete(id: string): Promise<void> {
    const loan = await this.loanRepository.findById(id);

    if (!loan) {
      throw new NotFoundError("El préstamo no existe");
    }

    const deleted = await this.loanRepository.delete(id);

    if (!deleted) {
      throw new NotFoundError("El préstamo no existe");
    }
    if (!loan.returned) {
      const booksCol = getDb().collection("books");

      await booksCol.updateOne(
        {
          _id: loan.bookId,
        },
        {
          $set: {
            available: true,
            updatedAt: new Date(),
          },
        },
      );
    }
  }
}
