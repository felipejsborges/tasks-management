import { describe, expect, it } from "vitest"
import { InMemoryTasksRepository } from "@/repositories/tasks/in-memory"
import { DeleteTaskUseCase } from "."

describe("Delete Task Use Case", () => {
  it("should be able to delete a task", async () => {
    const repository = new InMemoryTasksRepository()
    const useCase = new DeleteTaskUseCase(repository)

    const createdTask = await repository.create({
      title: "Task Title",
      description: "Task Description",
      effort: 1,
    })

    await useCase.execute(createdTask.id)

    const existsInRepository = await repository.findById(createdTask.id)

    expect(existsInRepository).toBeFalsy()
  })
})
