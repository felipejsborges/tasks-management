import { AppError } from "@/errors/AppError"

export class InvalidCredentials extends AppError {
  constructor() {
    super("Invalid credentials", 401)
  }
}