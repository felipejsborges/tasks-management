import { InMemoryUsersRepository } from "@/repositories/users/in-memory"
import { describe, expect, it } from "vitest"
import { ProfileUseCase } from "."
import { UserNotFound } from "../_errors/user-not-found"

describe("Profile Use Case", () => {
  it("should be able to get the user profile", async () => {
    const repository = new InMemoryUsersRepository()
    const useCase = new ProfileUseCase(repository)

    const { id } = await repository.create({
      email: "john.doe@email.com",
      name: "John Doe",
      passwordHash: "123456"
    })

    const response = await useCase.execute(id)

    expect(response.user).toHaveProperty("id")
  })

  it("should not be able to get the user profile if the user does not exist", async () => {
    const repository = new InMemoryUsersRepository()
    const useCase = new ProfileUseCase(repository)

    try {
      await useCase.execute("non-existing-user-id")
    } catch (err) {
      expect(err).toBeInstanceOf(UserNotFound)
    }
  })
})
