import { describe, expect, it } from "vitest"
import { InMemoryTasksRepository } from "@/repositories/tasks/in-memory"
import { CreateTaskUseCase } from "."

describe("Create Task Use Case", () => {
  it("should be able to create a task", async () => {
    const repository = new InMemoryTasksRepository()
    const useCase = new CreateTaskUseCase(repository)

    const response = await useCase.execute({
      title: "Task Title",
      description: "Task Description",
      effort: 1,
    })

    expect(response.task).toHaveProperty("id")
  })
})
