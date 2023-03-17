import { Task } from "@/entities/task"

export type TaskInput = Pick<Task, "title" | "description" | "effort" | "completedAt">

export interface TasksRepository {
	create(data: TaskInput): Promise<Task>
	findAll(): Promise<Task[]>
	findById(id: string): Promise<Task | undefined>
	updateById(id: string, data: Partial<TaskInput>): Promise<Task>	
	deleteById(id: string): Promise<void>
}
