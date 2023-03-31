import { env } from "@/env"
import { prisma } from "@/database/prisma"

const testsDatabaseSchema = env.TESTS_DB_SCHEMA

export async function clearDatabase() {
  if (env.NODE_ENV !== "test") return

  const tableNames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tableName FROM pg_tables where schemaname = ${testsDatabaseSchema}`

  const tables = tableNames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"${testsDatabaseSchema}"."${name}"`)
    .join(", ")

  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
}
