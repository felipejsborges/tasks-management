import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { app } from "@/app"
import { clearDatabase } from "prisma/test_utils/clear-database"

describe("Profile (integration): GET /users/:userId", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  it("should be able to get the profile of an user", async () => {
    const user = {
      email: "john.doe2@email.com",
      password: "123456",
      name: "John Doe"
    }

    const createUserResponse = (await app.inject({
      method: "POST",
      url: "/users",
      payload: { ...user }
    })).json()

    const createSessionResponse = (await app.inject({
      method: "POST",
      url: "/users/sessions",
      payload: {
        email: user.email,
        password: user.password
      }
    })).json()

    const response = await app.inject({
      method: "GET",
      url: `/users/${createUserResponse.user.id}`,
      headers: {
        Authorization: `Bearer ${createSessionResponse.token}`
      }
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).user.id).toEqual(expect.any(String))
  })
})

