import { HashProvider } from "@/providers/hash/interface"
import { UsersRepository } from "@/repositories/users/interface"
import { UserAlreadyExists } from "../_errors/user-already-exists"
import { UserNotFound } from "../_errors/user-not-found"

interface UpdateUserUseCaseInput {
	email?: string
	name?: string
	password?: string
}

export class UpdateUserUseCase {
  constructor(
		private usersRepository: UsersRepository,
		private hashProvider: HashProvider
  ) {}

  async execute(id: string, input: UpdateUserUseCaseInput) {
    const userToUpdate = await this.usersRepository.findById(id)

    if (!userToUpdate) {
      throw new UserNotFound()
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(input.email)

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new UserAlreadyExists()
    }

    const payload = await this.getPayload(input)

    const user = await this.usersRepository.updateById(id, payload)

    return { user }
  }

  /**
   * Get the payload to be updated, hashing the password if necessary
   * @param input 
   * @returns 
   */
  private async getPayload(input: UpdateUserUseCaseInput) {
    const payload = {
      ...input,
      ...(input.password
        ? { passwordHash: await this.hashProvider.hash(input.password) }
        : {}),
    }

    delete payload?.password

    return payload
  }
}