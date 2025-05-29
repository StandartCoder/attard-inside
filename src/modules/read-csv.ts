import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { db } from '@/lib/db'; // oder direkt der Pfad zu drizzle instance
import { products } from '@/lib/db/schema';

export let company = '';

export function setCompany(value: string) {
  company = value;
}

export function getCompany() {
  return company;
}

export async function FromCSVToProductsDB(filePath: string) {
  const fullPath = path.resolve(filePath);
  const fileContent = fs.readFileSync(fullPath, 'utf8');

  const records: any[] = [];

  await new Promise<void>((resolve, reject) => {
    parse(
      fileContent,
      {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      },
      (err, parsed) => {
        if (err) return reject(err);
        records.push(...parsed);
        resolve();
      }
    );
  });

  // Optional: CSV-Felder in das gewünschte Format umwandeln
  const mapped = records.map((row) => ({
    handleId: row.handleId,
    productId: row['product_1cc4562a-88ec-2eef-f3f5-d92ce751eac7']?.trim() || 'UNKNOWN',
    fieldType: row.fieldType,
    name: row.name,
    description: row.description || '',
    productImageUrl: row.productImageUrl,
    collection: row.collection,
    sku: row.sku,
    ribbon: row.ribbon,
    price: parseFloat(row.price || '0'),
    surcharge: row.surcharge ? parseFloat(row.surcharge) : null,
    visible: row.visible === 'true' ? 1 : 0,
    discountMode: row.discountMode,
    discountValue: parseFloat(row.discountValue || '0'),
    inventory: parseInt(row.inventory || '0'),
    weight: row.weight ? parseFloat(row.weight) : null,
    cost: parseFloat(row.cost || '0'),
    type: row.type,
    taxOnSale: row.taxOnSale,
    priceIncludeTax: row['Price/RateIncludeTax'] === 'yes' ? 1 : 0,
    incomeAccount: row.incomeAccount,
    taxOnPurchase: row.taxOnPurchase,
    purchaseCostIncludeTax: row.purchaseCOstIncludeTax === 'yes' ? 1 : 0,
    expenseAccount: row.xxpenseAccount,
    reorderPoint: parseInt(row.reorderPoint || '0'),
    quantityAsOfDate: row['quantityAs-ofDate'],
    associatedCompany: company
  }));

  // In DB schreiben
  const BATCH_SIZE = 10;

  for (let i = 0; i < mapped.length; i += BATCH_SIZE) {
    const batch = mapped.slice(i, i + BATCH_SIZE);
    await db.insert(products).values(batch);
  }
  console.log(`✅ ${mapped.length} Produkte erfolgreich eingefügt.`);
}