import { prisma } from "@/database/prisma"
import { User } from "@/entities/user"
import { UserInput, UsersRepository } from "./interface"

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserInput): Promise<User> {
    const user = await prisma.user.create({ data })

    return user
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()

    return users
  }

  async updateById(id: string, data: Partial<UserInput>): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data,
    })

    return user
  }

  async deleteById(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    })
  }
}