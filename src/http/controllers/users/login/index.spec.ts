import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { app } from "@/app"
import { clearDatabase } from "prisma/test_utils/clear-database"

describe("Login (integration): POST /sessions", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  it("should be able to login and generate a token", async () => {
    const email = "john.doe3@email.com"
    const password = "123456"

    await app.inject({
      method: "POST",
      url: "/users",
      payload: {
        email,
        password,
        name: "John Doe"
      }
    })

    const response = await app.inject({
      method: "POST",
      url: "/users/sessions",
      payload: {
        email,
        password,
      }
    })

    expect(response.statusCode).toBe(201)
    expect(JSON.parse(response.body).token).toEqual(expect.any(String))
  })
})

