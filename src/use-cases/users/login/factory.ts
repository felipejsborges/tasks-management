import { LoginUseCase } from "."

export function makeLoginUseCase() {
  const repository = new PrismaUsersRepository()
  const hashProvider = new BCryptHashProvider()

  return new LoginUseCase(repository, hashProvider)
}