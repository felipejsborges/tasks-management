import { TasksRepository } from "@/repositories/tasks/interface"
import { TaskNotFound } from "../_errors/task-not-found"

interface UpdateTaskUseCaseInput {
	title?: string
	description?: string
	effort?: number
}

export class UpdateTaskUseCase {
  constructor(
		private tasksRepository: TasksRepository,
  ) {}

  async execute(id: string, input: UpdateTaskUseCaseInput) {
    const existentTask = await this.tasksRepository.findById(id)

    if (!existentTask) throw new TaskNotFound()

    const task = await this.tasksRepository.updateById(id, input)

    return { task }
  }
}