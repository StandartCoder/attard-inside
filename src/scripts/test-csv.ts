import { FromCSVToProductsDB, setCompany } from '../modules/read-csv';
import { clearTable } from '../modules/clear-table';
import * as analyse from '../modules/analyse-db';
import { db } from '@/lib/db'; // oder direkt der Pfad zu drizzle instance
import { products } from '@/lib/db/schema';



(async () => {  
  //await ClearTable();

  //await AddProducts();

  await TestOutput();
})();

export async function AddProducts() {
  console.log(`=== add products ===`);
  setCompany('temporary firm');
  await FromCSVToProductsDB('./public/catalog_products.csv');
}

export async function ClearTable() {
  console.log(`=== cleared table ===`);
  await clearTable(products);
}

export async function TestOutput() {
  console.log('=== product analyse ===');
  console.log(`different products: ${(await analyse.getProducts()).length}`);
  console.log(`all products: ${(await analyse.getTotalInventory())}`);
  console.log(`avg price: ${(await analyse.getAvgPrice())} €`);
  console.log(`visible products: ${(await analyse.getVisibleProducts())}`);
  console.log(`total value: ${(await analyse.getTotalStockValue())} €`);
  console.log(`products with discount: ${(await analyse.getDiscountedProducts()).length}`);
  console.log(`potential profit: ${(await analyse.getPotentialProfit())} €`);
  console.log(`avg profit per product: ${(await analyse.getAverageProfitPerProduct())} €`);
  console.log(`total weight: ${(await analyse.getTotalStockWeight())}`);

  //console.log('products per collection:');
  //for (const [collection, count] of Object.entries((await analyse.getProductsPerCollection()))) {console.log(`  ${collection}: ${count}`);}
  console.log(`most expensive products:`);
  (await analyse.getTopPricedProducts(5)).forEach(p => {console.log(`- ${p.name}: ${p.price} € | ${p.associatedCompany}`)});
  //console.log(`lowest stock products:`);
  //(await analyse.getLowStockProducts(1)).forEach(p => {console.log(`- ${p.name} ${p.inventory} Stück`)});

  //console.log(`out of stock:`);
  //(await analyse.getOutOfStockProducts()).forEach(p => {console.log(`- ${p.name}: price: ${p.price} €`)});

  //console.log(`products to reorder:`);
  //(await analyse.getBelowReorderPoint()).forEach(p => {console.log(`- ${p.name} ${p.inventory} Stück`)});

  console.log(`non profitable products:`);
  (await analyse.getNonProfitableProducts()).forEach(p => {console.log(`- ${p.name}: price: ${p.price} € cost: ${p.cost} €`)});

  console.log(`older than 1 month: ${(await analyse.getStaleStock(new Date(Date.now() - 90 * 86400_000).toISOString()))}`);
}