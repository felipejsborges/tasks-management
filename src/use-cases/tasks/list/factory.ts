import { PrismaTasksRepository } from "@/repositories/tasks/implementation"
import { ListTasksUseCase } from "."

export function makeListTasksUseCase() {
  const repository = new PrismaTasksRepository()

  return new ListTasksUseCase(repository)
}