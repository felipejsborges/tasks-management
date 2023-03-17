import { HashProvider } from "@/providers/hash/interface"
import { UsersRepository } from "@/repositories/users/interface"

import { UserAlreadyExists } from "./errors/user-already-exists"

interface RegisterUseCaseInput {
	email: string
	name: string
	password: string
}

export class RegisterUseCase {
  constructor(
		private usersRepository: UsersRepository,
		private hashProvider: HashProvider
  ) {}

  async execute(input: RegisterUseCaseInput) {
    const userAlreadyExists = await this.usersRepository.findByEmail(input.email)

    if (userAlreadyExists) {
      throw new UserAlreadyExists()
    }

    const hashedPassword = await this.hashProvider.hash(input.password)

    const user = await this.usersRepository.create({
      email: input.email,
      name: input.name,
      passwordHash: hashedPassword
    })

    return { user }
  }
}