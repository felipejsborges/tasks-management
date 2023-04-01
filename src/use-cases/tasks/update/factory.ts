import { PrismaTasksRepository } from "@/repositories/tasks/implementation"
import { UpdateTaskUseCase } from "."

export function makeUpdateTaskUseCase() {
  const repository = new PrismaTasksRepository()

  return new UpdateTaskUseCase(repository)
}