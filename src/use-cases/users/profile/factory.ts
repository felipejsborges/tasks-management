import { PrismaUsersRepository } from "@/repositories/users/implementation"
import { ProfileUseCase } from "."

export function makeProfileUseCase() {
  const repository = new PrismaUsersRepository()

  return new ProfileUseCase(repository)
}