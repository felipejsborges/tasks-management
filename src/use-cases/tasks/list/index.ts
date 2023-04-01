import { TasksRepository } from "@/repositories/tasks/interface"

export class ListTasksUseCase {
  constructor(
		private tasksRepository: TasksRepository,
  ) {}

  async execute() {
    const tasks = await this.tasksRepository.findAll()

    return { tasks }
  }
}