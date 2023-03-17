import { AppError } from "@/errors/AppError"

export class UserNotFound extends AppError {
  constructor() {
    super("User not found", 404)
  }
}