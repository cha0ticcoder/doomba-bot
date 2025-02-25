import {boolean, pgTable, primaryKey, smallserial, varchar} from "drizzle-orm/pg-core";

export const usersTable = pgTable('users', {
    userId: varchar('guild_id', { length: 19}).primaryKey().notNull(),
});

export const guildsTable = pgTable('guilds', {
    guildId: varchar('guild_id', { length: 19}).primaryKey().notNull(),
})

export const modulesTable = pgTable('modules', {
    moduleId: smallserial('module_id').primaryKey().notNull(),
})

export const typesTable = pgTable('types', {
    typeId: smallserial('type_id').primaryKey().notNull(),
    type: varchar('type').unique().notNull(),
})

export const guildModulesTable = pgTable('guild_modules', {
    guildId: varchar('guild_id', { length: 19}).references(() => guildsTable.guildId),
    moduleId: smallserial('module_id').references(() => modulesTable.moduleId),
    isEnabled: boolean('is_enabled'),
}, (table) => [
    primaryKey({ columns: [table.guildId, table.moduleId] })
])

export const moduleDataTable = pgTable('module_data', {
    moduleId: smallserial('module_id').references(() => modulesTable.moduleId).notNull(),
    guildId: varchar('guild_id', { length: 19}).references(() => guildsTable.guildId).notNull(),
    userId: varchar('guild_id').references(() => guildsTable.guildId),
})