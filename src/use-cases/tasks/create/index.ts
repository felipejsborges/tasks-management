import { TasksRepository } from "@/repositories/tasks/interface"

interface CreateTaskUseCaseInput {
	title: string
	description: string
	effort: number
}

export class CreateTaskUseCase {
  constructor(
		private tasksRepository: TasksRepository,
  ) {}

  async execute(input: CreateTaskUseCaseInput) {
    const task = await this.tasksRepository.create(input)

    return { task }
  }
}