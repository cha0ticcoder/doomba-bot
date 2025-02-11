import { pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: varchar().primaryKey(),
});