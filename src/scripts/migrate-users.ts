import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import Database from 'better-sqlite3';

// Define types for old user structure
interface OldUser {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  created_at: number;
  updated_at: number;
}

/**
 * Script to migrate users from old schema to new schema
 * Run this after updating the schema
 */
async function migrateUsers() {
  try {
    console.log('Starting user migration...');

    // Get direct access to the SQLite database
    const sqlite = new Database('sqlite.db');

    // Check if old table structure exists
    const oldTableExists = await checkOldTable(sqlite);
    if (!oldTableExists) {
      console.log('No old user table found, migration not needed.');
      return;
    }

    // Get all users from the old table
    const oldUsers = sqlite.prepare('SELECT * FROM users_old').all() as OldUser[];
    console.log(`Found ${oldUsers.length} users to migrate.`);

    // Create temporary backup of current users table if it doesn't exist
    sqlite.exec('CREATE TABLE IF NOT EXISTS users_old AS SELECT * FROM users');
    console.log('Created backup of current users table.');

    // Process each user
    for (const user of oldUsers) {
      const nameParts = user.name.split(' ');
      const firstName = nameParts[0] || 'User';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      const username = user.email.split('@')[0];
      
      // Determine permission level based on role
      const permission = user.role === 'admin' ? 7 : 1;

      const stmt = sqlite.prepare(`
        UPDATE users 
        SET 
          first_name = ?,
          last_name = ?,
          username = ?,
          permission = ?,
          settings = '{}',
          view = '{}',
          change_password_on_next = 1
        WHERE id = ?
      `);
      
      stmt.run(firstName, lastName, username, permission, user.id);
      console.log(`Migrated user: ${user.name} (${user.email})`);
    }

    console.log('User migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

async function checkOldTable(sqlite: Database.Database) {
  try {
    sqlite.prepare('SELECT 1 FROM users_old LIMIT 1').get();
    return true;
  } catch (error) {
    return false;
  }
}

migrateUsers(); 