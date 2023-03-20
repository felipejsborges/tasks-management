import { prisma } from "@/database/prisma"
import { Task } from "@/entities/task"
import { TaskInput, TasksRepository } from "./interface"

export class PrismaTasksRepository implements TasksRepository {
  async create(data: TaskInput): Promise<Task> {
    const task = await prisma.task.create({ data })

    return task
  }

  async findById(id: string): Promise<Task> {
    const task = await prisma.task.findUnique({
      where: { id },
    })

    return task
  }

  async findAll(): Promise<Task[]> {
    const tasks = await prisma.task.findMany()

    return tasks
  }

  async updateById(id: string, data: Partial<TaskInput>): Promise<Task> {
    const task = await prisma.task.update({
      where: { id },
      data,
    })

    return task
  }

  async deleteById(id: string): Promise<void> {
    await prisma.task.delete({
      where: { id },
    })
  }
}