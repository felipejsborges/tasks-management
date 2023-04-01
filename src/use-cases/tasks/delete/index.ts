import { TasksRepository } from "@/repositories/tasks/interface"
import { TaskNotFound } from "../_errors/task-not-found"

export class DeleteTaskUseCase {
  constructor(
		private tasksRepository: TasksRepository,
  ) {}

  async execute(id: string) {
    const existentTask = await this.tasksRepository.findById(id)

    if (!existentTask) throw new TaskNotFound()

    await this.tasksRepository.deleteById(id)
  }
}