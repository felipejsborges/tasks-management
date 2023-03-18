import { AppError } from "@/errors/AppError"

export class InvalidJwt extends AppError {
  constructor() {
    super("Invalid JWT", 401)
  }
}