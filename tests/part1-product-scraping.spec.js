import { writeFileSync } from 'node:fs';
import { test, expect } from '../src/fixtures.js';

test('should extract products from first two pages and save to file', async ({ homePage }) => {
  await homePage.goto();

  const page1 = await homePage.getProducts();
  await homePage.goToNextPage();
  const page2 = await homePage.getProducts();

  const lines = ['Demoblaze Product Catalog', '='.repeat(40), ''];

  [
    { num: 1, products: page1 },
    { num: 2, products: page2 },
  ].forEach(({ num, products }) => {
    lines.push(`Page ${num}`, '-'.repeat(20));
    products.forEach((p) => {
      lines.push(`Name:  ${p.name}`, `Price: ${p.price}`, `Link:  ${p.link}`, '');
    });
  });

  writeFileSync('products.txt', lines.join('\n'), 'utf-8');

  expect(page1.length).toBeGreaterThan(0);
  expect(page2.length).toBeGreaterThan(0);

  for (const p of [...page1, ...page2]) {
    expect(p.name).toBeTruthy();
    expect(p.price).toMatch(/^\$/);
    expect(p.link).toContain('prod.html');
  }
});
