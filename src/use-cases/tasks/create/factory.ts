import { PrismaTasksRepository } from "@/repositories/tasks/implementation"
import { CreateTaskUseCase } from "."

export function makeCreateTaskUseCase() {
  const repository = new PrismaTasksRepository()

  return new CreateTaskUseCase(repository)
}