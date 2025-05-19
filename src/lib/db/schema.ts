import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable, real } from 'drizzle-orm/sqlite-core';

// Users table schema
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  settings: text('settings').default('{}'),
  view: text('view').default('{}'),
  permission: integer('permission').notNull().default(1),
  changePasswordOnNext: integer('change_password_on_next').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Sessions table schema
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const products = sqliteTable('products', {
  handleId: text('handle_id').primaryKey(),

  productId: text('product_id').notNull(), // entspricht z.B. "product_1cc4562a-88ec-2eef-f3f5-d92ce751eac7"
  fieldType: text('field_type').notNull(), // z.B. "Product"
  name: text('name').notNull(),
  description: text('description'),
  productImageUrl: text('product_image_url'), // mehrere URLs durch ; getrennt
  collection: text('collection'),
  sku: text('sku'),
  ribbon: text('ribbon'),

  price: real('price').notNull(),           // z.B. 6.15
  surcharge: real('surcharge'),            // optional
  visible: integer('visible').notNull().default(1), // boolean: 1 = true, 0 = false

  discountMode: text('discount_mode'),     // z.B. "PERCENT"
  discountValue: real('discount_value').default(0.0),

  inventory: integer('inventory').default(0),
  weight: real('weight'),
  cost: real('cost'),

  type: text('type'),                      // z.B. "inventory"
  taxOnSale: text('tax_on_sale'),         // z.B. "VAT 18%"
  priceIncludeTax: integer('price_include_tax').default(0), // boolean
  incomeAccount: text('income_account'),

  taxOnPurchase: text('tax_on_purchase'),
  purchaseCostIncludeTax: integer('purchase_cost_include_tax').default(0), // boolean
  expenseAccount: text('expense_account'),

  reorderPoint: integer('reorder_point').default(0),
  quantityAsOfDate: text('quantity_as_of_date') // z.B. "13/05/2025"
});

// Types for our schema
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert; 