export class ProductPage {
  constructor(page) {
    this.page = page;
    this.nameEl = page.locator('.name');
    this.priceEl = page.locator('.price-container');
    this.addToCartBtn = page.locator('a', { hasText: 'Add to cart' });
  }

  async getName() {
    return (await this.nameEl.textContent()).trim();
  }

  async getPrice() {
    const text = await this.priceEl.textContent();
    return text.replace('*includes tax', '').trim();
  }

  async addToCart() {
    this.page.once('dialog', (d) => d.accept());
    await this.addToCartBtn.click();
    await this.page.waitForTimeout(500);
  }
}
