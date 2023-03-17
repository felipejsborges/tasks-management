import { Task } from "@/entities/task"
import { randomUUID } from "crypto"
import { TaskInput, TasksRepository } from "./interface"

export class InMemoryTasksRepository implements TasksRepository {
  private tasks: Task[] = []

  async create(input: TaskInput): Promise<Task> {
    const task = {
      ...input,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.tasks.push(task)

    return task
  }

  async findAll(): Promise<Task[]> {
    return this.tasks
  }

  async findById(id: string): Promise<Task | undefined> {
    const task = this.tasks.find((task) => task.id === id)

    return task
  }

  async updateById(id: string, input: Partial<TaskInput>): Promise<Task> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)

    const updatedTask = {
      ...this.tasks[taskIndex],
      ...input,
      updatedAt: new Date()
    }

    this.tasks[taskIndex] = updatedTask

    return updatedTask
  }

  async deleteById(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)

    this.tasks.splice(taskIndex, 1)
  }
}