import "dotenv/config"

import { execSync } from "node:child_process"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const testsDatabaseSchema = process.env.TESTS_DB_SCHEMA

export default async function () {
  const databaseURL = new URL(process.env.DATABASE_URL)
  databaseURL.searchParams.set("schema", testsDatabaseSchema)
  process.env.DATABASE_URL = databaseURL.toString()

  execSync("yarn prisma migrate deploy")

  return async () => {
    await prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${testsDatabaseSchema}" CASCADE`,
    )

    await prisma.$disconnect()
  }
}
