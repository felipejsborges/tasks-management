import { InMemoryHashProvider } from "@/providers/hash/in-memory"
import { InMemoryUsersRepository } from "@/repositories/users/in-memory"
import { describe, expect, it } from "vitest"
import { RegisterUseCase } from "./register"

describe("Register Use Case", () => {
  it("should be able to register a new user", async () => {
    const repository = new InMemoryUsersRepository()
    const hashProvider = new InMemoryHashProvider()
    const useCase = new RegisterUseCase(repository, hashProvider)

    const response = await useCase.execute({
      email: "john.doe@email.com",
      name: "John Doe",
      password: "123456"
    })

    expect(response.user).toHaveProperty("id")
  })
})