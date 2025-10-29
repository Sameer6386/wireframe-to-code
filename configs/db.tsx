import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    if (!dbInstance) {
      const connectionString = process.env.DATABASE_URL;
      if (!connectionString) {
        throw new Error("DATABASE_URL is not defined");
      }
      const sql = neon(connectionString);
      dbInstance = drizzle(sql);
    }
    return (dbInstance as any)[prop];
  }
});
