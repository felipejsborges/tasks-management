import { TasksRepository } from "@/repositories/tasks/interface"
import { TaskNotFound } from "../_errors/task-not-found"

export class GetTaskUseCase {
  constructor(
		private tasksRepository: TasksRepository,
  ) {}

  async execute(id: string) {
    const task = await this.tasksRepository.findById(id)

    if (!task) throw new TaskNotFound()

    return { task }
  }
}