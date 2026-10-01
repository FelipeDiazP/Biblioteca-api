import { ObjectId } from "mongodb";

export interface Loan {
  _id?: ObjectId;
  bookId: ObjectId;
  userId: ObjectId;
  loanDate: Date;
  returnDate?: Date;
  returned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoanDTO {
  bookId: string;
  userId: string;
  loanDate?: string;
}