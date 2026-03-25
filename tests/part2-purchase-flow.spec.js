import { test, expect } from '../src/fixtures.js';

test.describe('Part 2 - E2E Scenarios', () => {
  test('should complete a product purchase', async ({ homePage, productPage, cartPage }) => {
    await homePage.goto();
    await homePage.openProduct('Samsung galaxy s6');

    expect(await productPage.getName()).toBe('Samsung galaxy s6');
    expect(await productPage.getPrice()).toContain('$360');

    await productPage.addToCart();

    await cartPage.goto();
    const items = await cartPage.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Samsung galaxy s6');
    expect(items[0].price).toBe('360');

    await cartPage.placeOrder({
      name: 'Test User',
      country: 'United States',
      city: 'New York',
      card: '4111111111111111',
      month: '12',
      year: '2026',
    });

    const confirmation = await cartPage.getConfirmationText();
    expect(confirmation).toContain('Thank you for your purchase');

    await cartPage.confirmPurchase();
  });

  test('should filter products by category', async ({ homePage }) => {
    await homePage.goto();
    const allProducts = await homePage.getProducts();

    await homePage.selectCategory('Phones');
    const phones = await homePage.getProducts();

    expect(phones.length).toBeGreaterThan(0);
    expect(phones.length).toBeLessThanOrEqual(allProducts.length);

    for (const p of phones) {
      expect(p.name).toBeTruthy();
      expect(p.price).toMatch(/^\$/);
    }
  });

  test('should add and remove product from cart', async ({ homePage, productPage, cartPage }) => {
    await homePage.goto();
    await homePage.openProduct('Nokia lumia 1520');
    await productPage.addToCart();

    await cartPage.goto();
    const items = await cartPage.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Nokia lumia 1520');

    await cartPage.deleteItem('Nokia lumia 1520');
    await expect(cartPage.items).toHaveCount(0);
  });
});
