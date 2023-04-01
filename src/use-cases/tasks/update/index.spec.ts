import { describe, expect, it } from "vitest"
import { InMemoryTasksRepository } from "@/repositories/tasks/in-memory"
import { UpdateTaskUseCase } from "."

describe("Update Task Use Case", () => {
  it("should be able to update a task", async () => {
    const repository = new InMemoryTasksRepository()
    const useCase = new UpdateTaskUseCase(repository)

    const createdTask = await repository.create({
      title: "Task Title",
      description: "Task Description",
      effort: 1,
    })

    const dataToUpdate = {
      title: "Task Title Updated",
      description: "Task Description Updated",
      effort: 2,
    }

    const response = await useCase.execute(createdTask.id, dataToUpdate)

    expect(response.task.title).toBe(dataToUpdate.title)
    expect(response.task.description).toBe(dataToUpdate.description)
    expect(response.task.effort).toBe(dataToUpdate.effort)
  })
})
