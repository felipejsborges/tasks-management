import { HashProvider } from "@/providers/hash/interface"
import { UsersRepository } from "@/repositories/users/interface"
import { InvalidCredentials } from "../_errors/invalid-credentials"

interface LoginUseCaseInput {
	email: string
	password: string
}

export class LoginUseCase {
  constructor(
		private usersRepository: UsersRepository,
		private hashProvider: HashProvider
  ) {}

  async execute({email, password}: LoginUseCaseInput) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentials()
    }

    const passwordMatches = await this.hashProvider.compare(password, user.passwordHash)

    if (!passwordMatches) {
      throw new InvalidCredentials()
    }

    return { user }
  }
}