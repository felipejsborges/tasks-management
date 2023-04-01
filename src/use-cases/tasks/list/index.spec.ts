import { describe, expect, it } from "vitest"
import { InMemoryTasksRepository } from "@/repositories/tasks/in-memory"
import { ListTasksUseCase } from "."

describe("List Tasks Use Case", () => {
  it("should be able to list tasks", async () => {
    const repository = new InMemoryTasksRepository()
    const useCase = new ListTasksUseCase(repository)

    const randomLength = Math.floor(Math.random() * 10) + 1

    for (let i = 0; i < randomLength; i++) {
      await repository.create({
        title: "Task Title",
        description: "Task Description",
        effort: 1,
      })
    }

    const response = await useCase.execute()

    expect(response.tasks.length).toBe(randomLength)
  })
})
