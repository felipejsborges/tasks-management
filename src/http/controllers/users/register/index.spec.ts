import { afterAll, beforeEach, describe, expect, it } from "vitest"
import { app } from "@/app"
import { clearDatabase } from "../../_utils/clearDatabase"

describe("POST /users", () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  it("should be able to register a new user", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/users",
      payload: {
        email: "john.doe@email.com",
        password: "123456",
        name: "John Doe"
      }
    })

    expect(response.statusCode).toBe(201)
    expect(JSON.parse(response.body).user.id).toEqual(expect.any(String))
  })
})

afterAll(async () => {
  await app.close()
})