import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { app } from "@/app"
import { clearDatabase } from "prisma/test_utils/clear-database"
import { User } from "@/entities/user"

describe("Create Task (integration): POST /tasks", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  it("should be able to create a new task", async () => {
    const userData = {
      name: "John Doe",
      email: "john.doe6@email.com",
      password: "123456"
    }

    const { user: createdUser } = (
      await app.inject({
        method: "POST",
        url: "/users",
        payload: userData
      })).json<{ user: User }>()

    const { token } = (await app.inject({
      method: "POST",
      url: "/users/sessions",
      payload: {
        email: userData.email,
        password: userData.password
      }
    })).json<{ token: string }>()

    const response = await app.inject({
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

    expect(response.statusCode).toBe(201)
    expect(JSON.parse(response.body).task.id).toEqual(expect.any(String))
  })
})

