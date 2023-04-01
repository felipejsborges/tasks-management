import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { app } from "@/app"
import { clearDatabase } from "prisma/test_utils/clear-database"
import { User } from "@/entities/user"
import { Task } from "@/entities/task"

describe("Delete Task (integration): DELETE /tasks/:taskId", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  it("should be able to delete a task", async () => {
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
      url: "/sessions",
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

    // Delete the task
    const response = await app.inject({
      method: "DELETE",
      url: `/tasks/${createdTask.id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    expect(response.statusCode).toBe(204)

    // Check if the task was deleted
    const getTheTaskResponse = await app.inject({
      method: "GET",
      url: `/tasks/${createdTask.id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    expect(getTheTaskResponse.statusCode).toBe(404)
  })
})

