import { db } from '@/lib/db'; // oder direkt der Pfad zu drizzle instance
import * as table_name from '@/lib/db/schema';

type Table = typeof table_name.users | typeof table_name.products | typeof table_name.sessions;

export async function clearTable(table: Table) 
{
    await db.delete(table);
}