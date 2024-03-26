import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatarUrl: text("avatar_url"),
  email: text("email").unique().notNull(),
});

export const oauthAccounts = pgTable(
  "oauth_accounts",
  {
    providerId: text("provider_id"),
    providerUserId: text("provider_user_id"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => ({ pk: primaryKey({ columns: [table.providerId, table.providerUserId] }) })
);

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

// TODO: tables for payment gateways

type Expand<T> = T extends unknown ? { [K in keyof T]: T[K] } : never;
type MakeOptional<T, K extends keyof T> = Expand<Omit<T, K> & Partial<Pick<T, K>>>;

export type User = typeof users.$inferSelect;
