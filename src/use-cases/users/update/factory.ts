import { BCryptHashProvider } from "@/providers/hash/implementation"
import { PrismaUsersRepository } from "@/repositories/users/implementation"
import { UpdateUserUseCase } from "."

export function makeUpdateUserUseCase() {
  const repository = new PrismaUsersRepository()
  const hashProvider = new BCryptHashProvider()

  return new UpdateUserUseCase(repository, hashProvider)
}