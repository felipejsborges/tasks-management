import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { app } from "@/app"
import { clearDatabase } from "prisma/test_utils/clear-database"
import { User } from "@/entities/user"

describe("Update User (integration): PUT /users/:userId", () => {
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  it("should be able to update an user", async () => {
    const userData = {
      name: "John Doe",
      email: "john.doe7@email.com",
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

    // Update the user
    const dataToUpdate = {
      email: "john.doe.updated2@email.com",
      password: "123456updated",
      name: "John Doe Updated"
    }

    const response = await app.inject({
      method: "PUT",
      url: `/users/${createdUser.id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: dataToUpdate
    })

    const updatedUser = response.json()

    expect(response.statusCode).toBe(200)
    expect(updatedUser.user.email).toBe(dataToUpdate.email)
    expect(updatedUser.user.name).toBe(dataToUpdate.name)
  })
})

