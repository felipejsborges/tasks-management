import { env } from "@/env"
import { prisma } from "@/database/prisma"

const testsDatabaseSchema = env.TESTS_DB_SCHEMA

export async function clearDatabase() {
  if (env.NODE_ENV !== "test") return

  const tableNames = await prisma.$queryRaw<
  Array<{ tablename: string }>
  >`SELECT tableName FROM pg_tables where schemaname = ${testsDatabaseSchema}`

  const promises = tableNames.map(({ tablename: tableName }) => {
    if (tableName !== "_prisma_migrations") {
      return prisma.$executeRawUnsafe(
        `TRUNCATE TABLE ${tableName} CASCADE;`
      )
    }
  })

  await Promise.all(promises)
}
