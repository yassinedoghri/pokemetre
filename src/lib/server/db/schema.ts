import { sqliteTable, int, text, real } from "drizzle-orm/sqlite-core";

export const pokemonsTable = sqliteTable("pokemons", {
  id: int().primaryKey(),
  identifier: text().notNull().unique(),
  height: int().notNull(),
  weight: int().notNull(),
  bmi: real().notNull(),
});
