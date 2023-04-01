import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { app } from "@/app"
import { clearDatabase } from "prisma/test_utils/clear-database"
import { User } from "@/entities/user"

describe("List Tasks (integration): GET /tasks/", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  it("should be able to list tasks", async () => {
    const userData = {
      name: "John Doe",
      email: "john.doe4@email.com",
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
    await app.inject({
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
    })

    // Get the tasks
    const response = await app.inject({
      method: "GET",
      url: "/tasks",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.json().tasks.length).toBeGreaterThan(0)
  })
})

