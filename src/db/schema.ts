import {boolean, integer, pgTable, primaryKey, varchar} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: varchar(),
});

export const guildsTable = pgTable("guilds", {
    id: varchar(),
})

export const availableModulesTable = pgTable("availableModules", {
    module_id: integer().primaryKey(),
    module_name: varchar(),
})

export const modulesTable = pgTable("modules", {
    module_id: integer().references(() => availableModulesTable.module_id),
    guild_id: varchar().references(() => guildsTable.id),
    enabled: boolean().notNull(),
}, (table) => [
    primaryKey({ columns: [table.module_id, table.guild_id] }),
])



export const moduleSettingsTable = pgTable("moduleSettings",{
    setting_id: integer(),
    module_id: integer().references(() => availableModulesTable.module_id),
    guild_id: varchar().references(() => guildsTable.id),
}, (table) => [
    primaryKey({ columns: [table.setting_id, table.module_id, table.guild_id] }),
])

export const moduleUserDataTable = pgTable("moduleData",{
    data_id: integer(),
    module_id: integer().references(() => availableModulesTable.module_id),
    guild_id: varchar().references(() => guildsTable.id),
    user_id: varchar().references(() => usersTable.id),

})
