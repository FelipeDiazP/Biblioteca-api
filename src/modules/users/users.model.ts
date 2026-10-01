import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDTO {
  name: string;
  email: string;
  phone: string;
}
