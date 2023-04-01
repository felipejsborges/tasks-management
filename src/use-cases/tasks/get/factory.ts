import { PrismaTasksRepository } from "@/repositories/tasks/implementation"
import { GetTaskUseCase } from "."

export function makeGetTaskUseCase() {
  const repository = new PrismaTasksRepository()

  return new GetTaskUseCase(repository)
}