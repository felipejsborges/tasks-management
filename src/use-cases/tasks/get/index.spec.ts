import { describe, expect, it } from "vitest"
import { InMemoryTasksRepository } from "@/repositories/tasks/in-memory"
import { GetTaskUseCase } from "."

describe("Get Task Use Case", () => {
  it("should be able to get a task", async () => {
    const repository = new InMemoryTasksRepository()
    const useCase = new GetTaskUseCase(repository)

    const createdTask = await repository.create({
      title: "Task Title",
      description: "Task Description",
      effort: 1,
    })

    const response = await useCase.execute(createdTask.id)

    expect(response.task.title).toBe(createdTask.title)
    expect(response.task.description).toBe(createdTask.description)
    expect(response.task.effort).toBe(createdTask.effort)
  })
})
