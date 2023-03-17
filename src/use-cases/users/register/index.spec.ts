import { InMemoryHashProvider } from "@/providers/hash/in-memory"
import { InMemoryUsersRepository } from "@/repositories/users/in-memory"
import { describe, expect, it } from "vitest"
import { RegisterUseCase } from "."
import { UserAlreadyExists } from "../_errors/user-already-exists"

describe("Register Use Case", () => {
  it("should be able to register by filling out name, email, and password", async () => {
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

  it("should not be able to register with an existing email", async () => {
    const repository = new InMemoryUsersRepository()
    const hashProvider = new InMemoryHashProvider()
    const useCase = new RegisterUseCase(repository, hashProvider)

    const existentEmail = "john.doe@email.com"

    await repository.create({
      email: existentEmail,
      name: "John Doe",
      passwordHash: "123456"
    })

    try {
      await useCase.execute({
        email: existentEmail,
        name: "John Doe",
        password: "123456"
      })
    } catch(err) {
      expect(err).toBeInstanceOf(UserAlreadyExists)
    }
  })

  it("should encrypt the user's password before storing it in the database", async () => {
    const repository = new InMemoryUsersRepository()
    const hashProvider = new InMemoryHashProvider()
    const useCase = new RegisterUseCase(repository, hashProvider)

    const response = await useCase.execute({
      email: "john.doe@email.com",
      name: "John Doe",
      password: "123456"
    })

    expect(response.user.passwordHash).toBeTruthy()
    expect(response.user.passwordHash).not.toBe("123456")
  })
})
