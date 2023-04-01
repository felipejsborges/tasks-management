import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { app } from "@/app"
import { clearDatabase } from "prisma/test_utils/clear-database"

describe("Update User (integration): PUT /users/:user_id", () => {
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
    const createdUser = (await app.inject({
      method: "POST",
      url: "/users",
      payload: {
        email: "john.doe@email.com",
        password: "123456",
        name: "John Doe"
      }
    })).json()

    const dataToUpdate = {
      email: "john.doe.updated2@email.com",
      password: "123456updated",
      name: "John Doe Updated"
    }

    const response = await app.inject({
      method: "PUT",
      url: `/users/${createdUser.user.id}`,
      payload: dataToUpdate
    })

    const updatedUser = response.json()

    expect(response.statusCode).toBe(200)
    expect(updatedUser.user.email).toBe(dataToUpdate.email)
    expect(updatedUser.user.name).toBe(dataToUpdate.name)
  })
})

