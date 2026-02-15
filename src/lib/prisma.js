import { PrismaClient } from "@prisma/client";

let prisma;
const runtimeDatabaseUrl = process.env.DATABASE_URL ?? "";
const isDirectSupabaseUrl =
  runtimeDatabaseUrl.includes("supabase.co") &&
  runtimeDatabaseUrl.includes(":5432");

if (process.env.NODE_ENV === "production" && isDirectSupabaseUrl) {
  console.warn(
    "[prisma] DATABASE_URL appears to use a direct Supabase Postgres endpoint. Use Supabase pooler/pgbouncer URL in production to reduce connection latency."
  );
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
