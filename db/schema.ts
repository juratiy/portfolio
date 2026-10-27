import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const projects = sqliteTable("portfolio_projects", {
  id: text("id").primaryKey(), data: text("data").notNull(),
  archived: integer("archived").notNull().default(0),
  createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
  ownerId: text("owner_id"),
});
