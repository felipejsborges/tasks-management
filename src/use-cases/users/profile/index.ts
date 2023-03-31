import { UsersRepository } from "@/repositories/users/interface"
import { UserNotFound } from "../_errors/user-not-found"

export class ProfileUseCase {
  constructor(
		private usersRepository: UsersRepository,
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new (UserNotFound)
    }

    delete user.passwordHash

    return { user }
  }
}