import { User } from "@/entities/user"
import { randomUUID } from "crypto"
import { UserInput, UsersRepository } from "./interface"

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async create(input: UserInput): Promise<User> {
    const user = {
      ...input,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.users.push(user)

    return user
  }

  async findAll(): Promise<User[]> {
    return this.users
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id)

    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email)

    return user
  }

  async updateById(id: string, input: Partial<UserInput>): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id)

    const updatedUser = {
      ...this.users[userIndex],
      ...input,
      updatedAt: new Date()
    }

    this.users[userIndex] = updatedUser

    return updatedUser
  }

  async deleteById(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id)

    this.users.splice(userIndex, 1)
  }
}