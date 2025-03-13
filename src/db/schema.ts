import {boolean, index, pgTable, primaryKey, smallserial, text, uniqueIndex, varchar} from "drizzle-orm/pg-core";

export const usersTable = pgTable('users', {
    id: varchar('id', { length: 19}).primaryKey(),
});

export const guildsTable = pgTable('guilds', {
    id: varchar('id', { length: 19}).primaryKey(),
})

export const modulesTable = pgTable('modules', {
    id: smallserial('id').primaryKey(),
    moduleName: text('module_name'),
    moduleDescription: text('module_description'),
});

export const typesTable = pgTable('types', {
    id: smallserial('id').primaryKey(),
    type: text('type').notNull(),
}, (table) => [
    uniqueIndex("type_idx").on(table.type)
])

export const guildModulesTable = pgTable('guild_modules', {
    guildId: varchar('guild_id', { length: 19}).references(() => guildsTable.id),
    moduleId: smallserial('module_id').references(() => modulesTable.id),
    isEnabled: boolean('is_enabled'),
}, (table) => [
    primaryKey({ columns: [table.guildId, table.moduleId] }),
    index("is_enabled_idx").on(table.isEnabled),
])

export const moduleDataTable = pgTable('module_data', {
    moduleId: smallserial('module_id').references(() => modulesTable.id),
    guildId: varchar('guild_id', { length: 19}).references(() => guildsTable.id),
    dataName: text('data_name'),
    userId: varchar('guild_id').references(() => usersTable.id),
    dataValue: text('data_value'),
    typeId: smallserial('type_id').references(() => typesTable.id),
}, (table) => [
    primaryKey({ columns: [table.moduleId, table.guildId, table.dataName] }),
    
]);