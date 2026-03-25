export class CartPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('#tbodyid tr');
    this.total = page.locator('#totalp');
    this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
    this.purchaseBtn = page.locator('#orderModal .btn-primary');
    this.confirmation = page.locator('.sweet-alert');
  }

  async goto() {
    await this.page.goto('/cart.html');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
  }

  async getItems() {
    await this.items.first().waitFor({ timeout: 5000 });
    const rows = await this.items.all();
    return Promise.all(
      rows.map(async (row) => {
        const cells = row.locator('td');
        return {
          name: (await cells.nth(1).textContent()).trim(),
          price: (await cells.nth(2).textContent()).trim(),
        };
      }),
    );
  }

  async deleteItem(name) {
    const row = this.items.filter({ hasText: name });
    await row.getByRole('link', { name: 'Delete' }).click();
    await this.page.waitForTimeout(1000);
  }

  async placeOrder({ name, country, city, card, month, year }) {
    await this.placeOrderBtn.click();
    await this.page.locator('#orderModal').waitFor({ state: 'visible' });
    await this.page.locator('#name').fill(name);
    await this.page.locator('#country').fill(country);
    await this.page.locator('#city').fill(city);
    await this.page.locator('#card').fill(card);
    await this.page.locator('#month').fill(month);
    await this.page.locator('#year').fill(year);
    await this.purchaseBtn.click();
  }

  async getConfirmationText() {
    await this.confirmation.waitFor({ state: 'visible' });
    return (await this.confirmation.textContent()).trim();
  }

  async confirmPurchase() {
    await this.confirmation.locator('.confirm').click();
  }
}
