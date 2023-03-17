import { describe, expect, it } from "vitest"

import { InMemoryHashProvider } from "@/providers/hash/in-memory"
import { InMemoryUsersRepository } from "@/repositories/users/in-memory"
import { LoginUseCase } from "."
import { InvalidCredentials } from "../_errors/invalid-credentials"

describe("Login Use Case", () => {
  // The system should allow the user to log in by providing the registered email and password;
  it("should be able to login by providing the registered email and password", async () => {
    const repository = new InMemoryUsersRepository()
    const hashProvider = new InMemoryHashProvider()
    const useCase = new LoginUseCase(repository, hashProvider)

    const email = "john.doe@email.com"
    const password = "123456"
    const passwordHash = await hashProvider.hash(password)

    await repository.create({
      email,
      name: "John Doe",
      passwordHash
    })

    const response = await useCase.execute({
      email,
      password
    })

    expect(response.user).toHaveProperty("id")
  })

  it("should verify if the login information is valid and allow access to the user account", async () => {
    const repository = new InMemoryUsersRepository()
    const hashProvider = new InMemoryHashProvider()
    const useCase = new LoginUseCase(repository, hashProvider)

    const email = "john.doe@email.com"
    const password = "123456"
    const passwordHash = await hashProvider.hash(password)

    await repository.create({
      email,
      name: "John Doe",
      passwordHash
    })

    try {
      await useCase.execute({
        email,
        password
      })
    } catch(err) {
      expect(err).toBeInstanceOf(InvalidCredentials)
    }
  })
})
