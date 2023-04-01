import { PrismaTasksRepository } from "@/repositories/tasks/implementation"
import { DeleteTaskUseCase } from "."

export function makeDeleteTaskUseCase() {
  const repository = new PrismaTasksRepository()

  return new DeleteTaskUseCase(repository)
}