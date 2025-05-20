import { db, initDatabase } from '@/lib/db';
import { users } from '@/lib/db/schema';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

async function main() {
  try {
    // Initialize database tables
    await initDatabase();

    // Check if root user exists
    const rootExists = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, 'root@attardco.com'),
    });

    if (!rootExists) {
      // Create default root user
      const hashedPassword = await bcrypt.hash('root123', 10);
      const hashedPassword2 = await bcrypt.hash('worker123', 10);
      await db.insert(users).values({
        id: uuidv4(),
        firstName: 'Root',
        lastName: 'User',
        username: 'root',
        email: 'root@attardco.com',
        password: hashedPassword,
        permission: 7,
        settings: '{}',
        view: '{}',
        changePasswordOnNext: 0,
      });

      await db.insert(users).values({
        id: uuidv4(),
        firstName: 'Worker',
        lastName: 'User',
        username: 'worker',
        email: 'worker@attardco.com',
        password: hashedPassword2,
        permission: 2,
        settings: '{}',
        view: '{}',
        changePasswordOnNext: 0,
      });

      console.log('Default root user created successfully!');
      console.log('Default worker user created successfully!');
    } else {
      console.log('Root user already exists.');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

main(); 