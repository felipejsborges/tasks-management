import { BCryptHashProvider } from "@/providers/hash/implementation"
import { PrismaUsersRepository } from "@/repositories/users/implementation"
import { LoginUseCase } from "."

export function makeLoginUseCase() {
  const repository = new PrismaUsersRepository()
  const hashProvider = new BCryptHashProvider()

  return new LoginUseCase(repository, hashProvider)
}