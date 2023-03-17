import { User } from "@/entities/user"

export type UserInput = Pick<User, "email" | "name" | "passwordHash">

export interface UsersRepository {
	create(data: UserInput): Promise<User>
	findAll(): Promise<User[]>
	findById(id: string): Promise<User | undefined>
	findByEmail(email: string): Promise<User | undefined>
	updateById(id: string, data: Partial<UserInput>): Promise<User>	
	deleteById(id: string): Promise<void>
}
