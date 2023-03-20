import { afterAll, beforeEach, describe, expect, it } from "vitest"
import { app } from "@/app"
import { clearDatabase } from "../../_utils/clearDatabase"

describe("POST /sessions", () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  it("should be able to login and generate a token", async () => {
    const email = "john.doe@email.com"
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

afterAll(async () => {
  await app.close()
})