import { BCryptHashProvider } from "@/providers/hash/implementation"
import { PrismaUsersRepository } from "@/repositories/users/implementation"
import { RegisterUseCase } from "."

export function makeRegisterUseCase() {
  const repository = new PrismaUsersRepository()
  const hashProvider = new BCryptHashProvider()

  return new RegisterUseCase(repository, hashProvider)
}