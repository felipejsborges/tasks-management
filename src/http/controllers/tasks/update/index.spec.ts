import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { app } from "@/app"
import { clearDatabase } from "prisma/test_utils/clear-database"
import { User } from "@/entities/user"
import { Task } from "@/entities/task"

describe("Update Task (integration): PUT /tasks/:task_id", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  it("should be able to update a task", async () => {
    const userData = {
      name: "John Doe",
      email: "john.doe8@email.com",
      password: "123456"
    }

    // Create an user
    const { user: createdUser } = (
      await app.inject({
        method: "POST",
        url: "/users",
        payload: userData
      })).json<{ user: User }>()

    // Login
    const { token } = (await app.inject({
      method: "POST",
      url: "/users/sessions",
      payload: {
        email: userData.email,
        password: userData.password
      }
    })).json<{ token: string }>()

    // Create a task
    const { task: createdTask } = (await app.inject({
      method: "POST",
      url: "/tasks",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        userId: createdUser.id,
        title: "My new task",
        description: "My new task description",
        effort: 1
      }
    })).json<{ task: Task }>()

    // Update the task
    const dataToUpdate = {
      title: "My updated task",
      description: "My updated task description",
      effort: 2
    }

    const response = await app.inject({
      method: "PUT",
      url: `/tasks/${createdTask.id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: dataToUpdate
    })

    expect(response.statusCode).toBe(200)

    const responseBody = response.json()

    expect(responseBody.task.title).toBe(dataToUpdate.title)
    expect(responseBody.task.description).toBe(dataToUpdate.description)
    expect(responseBody.task.effort).toBe(dataToUpdate.effort)
  })
})

