import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Initialize SQLite database
const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });

// Helper function to initialize database tables
export async function initDatabase() {
  // Create tables if they don't exist
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      settings TEXT DEFAULT '{}',
      view TEXT DEFAULT '{}',
      permission INTEGER NOT NULL DEFAULT 1,
      change_password_on_next INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS products (
      handle_id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      field_type TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      product_image_url TEXT,
      collection TEXT,
      sku TEXT,
      ribbon TEXT,
      price REAL NOT NULL,
      surcharge REAL,
      visible INTEGER NOT NULL DEFAULT 1,
      discount_mode TEXT,
      discount_value REAL DEFAULT 0.0,
      inventory INTEGER DEFAULT 0,
      weight REAL,
      cost REAL,
      type TEXT,
      tax_on_sale TEXT,
      price_include_tax INTEGER DEFAULT 0,
      income_account TEXT,
      tax_on_purchase TEXT,
      purchase_cost_include_tax INTEGER DEFAULT 0,
      expense_account TEXT,
      reorder_point INTEGER DEFAULT 0,
      quantity_as_of_date TEXT
    );
  `);
} 