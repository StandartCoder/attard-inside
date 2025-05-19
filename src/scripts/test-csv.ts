import { FromCSVToProductsDB } from '../modules/read-csv';

(async () => {
  await FromCSVToProductsDB('./public/catalog_products.csv');
})();