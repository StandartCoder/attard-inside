import { db, initDatabase } from '@/lib/db';
import { users } from '@/lib/db/schema';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

async function main() {
  try {
    // Initialize database tables
    await initDatabase();

    // Check if admin user exists
    const adminExists = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, 'admin@attard.com'),
    });

    if (!adminExists) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.insert(users).values({
        id: uuidv4(),
        firstName: 'Admin',
        lastName: 'User',
        username: 'admin',
        email: 'admin@attard.com',
        password: hashedPassword,
        permission: 7,
        settings: '{}',
        view: '{}',
        changePasswordOnNext: 1,
      });

      console.log('Default admin user created successfully!');
    } else {
      console.log('Admin user already exists.');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

main(); 