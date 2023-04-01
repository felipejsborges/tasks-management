export interface Task {
	id: string
	userId: string
	title: string
	description: string
	effort: number
	createdAt: Date
	updatedAt: Date
	completedAt?: Date
}