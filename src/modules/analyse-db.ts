import { db } from '@/lib/db'; // Dein Drizzle-DB-Export
import { products } from '@/lib/db/schema'; // Dein Schema

export async function getProducts() {
  // Alle Produkte abrufen
  return await db.select().from(products);
}

export async function getTotalInventory() {
    const totalInventory = await getProducts();
    return totalInventory.reduce((sum, p) => sum + (p.inventory ?? 0), 0);
}

export async function getAvgPrice() {
    const avgPrice = await getProducts();
    return (avgPrice.reduce((sum, p) => sum + (p.price ?? 0), 0) / avgPrice.length).toFixed(2);
}

export async function getVisibleProducts() {
    const visibleCount = await getProducts();
    return visibleCount.filter(p => p.visible === 1).length;
}

export async function getProductsPerCollection() {
    const allProducts = await getProducts();
    const countPerCollection = allProducts.reduce<Record<string, number>>((acc, p) => {
      const col = p.collection ?? 'Unbekannt';
      acc[col] = (acc[col] ?? 0) + 1;
      return acc;
    }, {});
    return countPerCollection;
}

export async function getTotalStockValue() {
  const all = await getProducts();
  return all.reduce((sum, p) => sum + ((p.inventory ?? 0) * (p.cost ?? 0)), 0).toFixed(2);
}

export async function getLowStockProducts(threshold = 5) {
  const all = await getProducts();
  return all.filter(p => (p.inventory ?? 0) < threshold);
}

export async function getDiscountedProducts() {
  const all = await getProducts();
  return all.filter(p => (p.discountValue ?? 0) > 0);
}

export async function getTopPricedProducts(limit = 5) {
  const all = await getProducts();
  return all
    .filter(p => p.price != null)
    .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    .slice(0, limit);
}



export async function getOutOfStockProducts() {
  const rows = await db.select().from(products);
  return rows.filter(p => (p.inventory ?? 0) === 0);
}

export async function getBelowReorderPoint() {
  const rows = await db.select().from(products);
  return rows.filter(p => (p.inventory ?? 0) < (p.reorderPoint ?? 0));
}

export async function getPotentialProfit() {
  const rows = await db.select().from(products);
  return rows.reduce((sum, p) => {
    const profit = ((p.price ?? 0) - (p.cost ?? 0)) * (p.inventory ?? 0);
    return sum + (profit > 0 ? profit : 0);
  }, 0).toFixed(2);
}

export async function getNonProfitableProducts() {
  const rows = await db.select().from(products);
  return rows.filter(p => (p.price ?? 0) <= (p.cost ?? 0));
}

export async function getAverageProfitPerProduct() {
  const rows = await db.select().from(products);
  const profits = rows.map(p => (p.price ?? 0) - (p.cost ?? 0));
  return (profits.length ? profits.reduce((a, b) => a + b, 0) / profits.length : 0).toFixed(2);
}

export async function getStaleStock(thresholdDateISO: string) {
  const rows = await db.select().from(products);
  return rows.filter(p => {
    const date = new Date(p.quantityAsOfDate ?? '');
    return !isNaN(date.getTime()) && date < new Date(thresholdDateISO);
  });
}





getProducts().catch(console.error);
