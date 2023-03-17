import { AppError } from "@/errors/AppError"

export class UserAlreadyExists extends AppError {
  constructor() {
    super("User already exists", 409)
  }
}