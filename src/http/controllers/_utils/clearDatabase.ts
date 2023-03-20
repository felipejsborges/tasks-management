import { prisma } from "@/database/prisma"
import { env } from "@/env"

export async function clearDatabase() {
  if (env.NODE_ENV !== "test") return

  const tableNames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tableName FROM pg_tables where schemaname = 'public';`

  const promises = tableNames.map(({ tablename: tableName }) => {
    if (tableName !== "_prisma_migrations") {
      return prisma.$executeRawUnsafe(
        `TRUNCATE TABLE ${tableName} CASCADE;`
      )
    }
  })

  const result = await Promise.all(promises)
  console.log("Database cleared: ", result)
}
