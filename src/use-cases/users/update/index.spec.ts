import { InMemoryHashProvider } from "@/providers/hash/in-memory"
import { InMemoryUsersRepository } from "@/repositories/users/in-memory"
import { beforeEach, describe, expect, it } from "vitest"
import { UpdateUserUseCase } from "."
import { UserAlreadyExists } from "../_errors/user-already-exists"
import { UserNotFound } from "../_errors/user-not-found"

describe("Update User Use Case", () => {
  let repository: InMemoryUsersRepository
  let hashProvider: InMemoryHashProvider
  let useCase: UpdateUserUseCase

  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    hashProvider = new InMemoryHashProvider()
    useCase = new UpdateUserUseCase(repository, hashProvider)
  })


  it("should be able to update an user", async () => {
    const createdUser = await repository.create({
      email: "john.doe@email.com",
      name: "John Doe",
      passwordHash: "123456"
    })

    const dataToUpdate = {
      email: "john.doe.updated@email.com",
      name: "John Doe Updated",
      password: "123456updated"
    }

    const response = await useCase.execute(createdUser.id, dataToUpdate)

    expect(response.user.email).toBe(dataToUpdate.email)
    expect(response.user.name).toBe(dataToUpdate.name)

    const passwordIsCorrectHashed = await hashProvider.compare(
      dataToUpdate.password,
      response.user.passwordHash
    )

    expect(passwordIsCorrectHashed).toBe(true)
  })

  it("should not be able to update an user that does not exists", async () => {
    await expect(useCase.execute("non-existent-id", {})).rejects.toThrow(
      UserNotFound
    )
  })

  it("should not be able to update an user with an email that already exists", async () => {
    const sameEmail = "john.doe@email.com"

    await repository.create({
      email: sameEmail,
      name: "John Doe",
      passwordHash: "123456"
    })

    const createdUser = await repository.create({
      email: "another@email.com",
      name: "Another",
      passwordHash: "123456"
    })

    await expect(useCase.execute(createdUser.id, { email: sameEmail })).rejects.toThrow(
      UserAlreadyExists
    )
  })
})
